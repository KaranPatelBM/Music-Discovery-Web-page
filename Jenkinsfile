pipeline {
    agent any
    environment {
        IMAGE_NAME = "music-discovery-app"
        CONTAINER_NAME = "${IMAGE_NAME}-container"
    }
    stages {
        stage('Git Checkout') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'GIT_URL', variable: 'GIT_URL_SECRET')]) {                    
                        git branch: 'main', url: "${env.GIT_URL_SECRET}"
                    }
                }
            }
        }
        stage('Get Current Version') {
            steps {
               script {
                    // Use Jenkins build number to generate version
                    def defaultVersion = "v1"
                    def buildNumber = env.BUILD_NUMBER.toInteger()
                    def minorVersion = buildNumber % 100 // Keep the version in the format v1, v1.01, v1.02, ...
                    def versionTag = "${defaultVersion}.${String.format('%02d', minorVersion)}"

                    env.VERSION_TAG = versionTag
                    echo "Current version: ${versionTag}"
                }
            }
        }
        stage('Build & Push Docker Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'DOCKER_CREDENTIALS', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASSWORD')]) {
                        bat """
                            echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USER} --password-stdin
                        """
                        env.imageTag = "${DOCKER_USER}/${IMAGE_NAME}:${env.VERSION_TAG}"
                        bat "docker build -t ${env.imageTag} ."
                        docker.withRegistry("https://registry.hub.docker.com", 'DOCKER_CREDENTIALS') {
                            bat "docker push ${env.imageTag}"
                        }                        
                    }
                }
            }
        }
        stage('Run Docker Container') {
            steps {
                script {
                    bat "docker pull ${env.imageTag}"
                    def containerExists = bat(script: "docker ps -a --filter name=${CONTAINER_NAME} --format {{.Names}}", returnStdout: true).trim()
                    echo "Container exists: ${containerExists}"
                    if (containerExists) {
                        // If the container exists, stop and remove it
                        echo "Container ${CONTAINER_NAME} already exists. Stopping and removing it."
                        bat "docker stop ${CONTAINER_NAME}"
                        bat "docker rm ${CONTAINER_NAME}"
                    }
                    bat """
                        docker run -d --name ${CONTAINER_NAME} -p 8563:8563 ${env.imageTag}
                    """
                    sleep 15
                }
            }
        }
        stage('Build') {
            steps {
                withCredentials([string(credentialsId: 'VITE_LAST_FM_API_KEY', variable: 'API_SECRET')]) {
                    script {
                        def containerRunning = bat(script: """docker ps --filter name=${CONTAINER_NAME} --format "{{.Names}}""", returnStdout: true).trim()
                        echo "containerRunning: ${containerRunning}"
                        if (!containerRunning || containerRunning == '') {
                            // If the container is not running, start it
                            echo "Starting container ${CONTAINER_NAME}..."
                            bat "docker start ${CONTAINER_NAME}"
                            containerRunning = bat(script: "docker ps --filter name=${CONTAINER_NAME} --format {{.Names}}", returnStdout: true).trim()
                            if (!containerRunning) {
                                error "Failed to start container ${CONTAINER_NAME}"
                            }
                        }
                        bat "docker exec ${CONTAINER_NAME} npm install"
                        bat "docker exec ${CONTAINER_NAME} npm run dev"
                        def processId = bat(script: 'tasklist /FI "IMAGENAME eq node.exe"', returnStdout: true).trim()
                        echo "Started process with PID: ${processId}"
                        currentBuild.description = processId
                    }
                }
            }
        }
        stage('Lint and Build') {
            steps {
                withCredentials([string(credentialsId: 'VITE_LAST_FM_API_KEY', variable: 'API_SECRET')]) {
                    bat 'npm run lint'
                    bat 'npm run build'
                }
            }
        }
        stage('Trigger Playwright Test Build Job') {
            steps {
                build job: 'Playwright-Music-Discovery/master', wait: true
            }
        }
    }
post {
    always {
        script {
            def pid = currentBuild.description

            if (pid && pid.isInteger()) {
                bat "taskkill /PID ${pid} /F"
                echo "Killed process with PID: ${pid}"
            } else {
                echo "No valid PID found or process is not running."
            }
        }
    }
}

}

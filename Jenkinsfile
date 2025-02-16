pipeline {
    agent any
    environment {
        IMAGE_NAME = "music-discovery-app"
        DOCKER_REGISTRY = "https://registry.hub.docker.com"
        DOCKER_USERNAME = "karanpatebm"
    }
    stages {
        stage('Checkout') {
            steps {
                // Checkout the repository
                git branch: 'main', url: ""
            }
        }
        stage('Get Current Version') {
            steps {
                script {
                    // Use Jenkins build number to generate version
                    def defaultVersion = "v1"
                    def buildNumber = env.BUILD_NUMBER.toInteger()
                    def minorVersion = buildNumber % 100 // Keep the version in the format v1, v1.01, v1.02, ...
                    def versionTag = "${defaultVersion}.${String.format('%02d', defaultVersion)}"

                    // Set the current version as an environment variable
                    env.VERSION_TAG = versionTag
                    echo "Current version: ${versionTag}"
                }
            }
        }
        stage('Build & Push Docker Image') {
            steps {
                script {
                    def imageTag = "${DOCKER_USERNAME}/${IMAGE_NAME}:${env.VERSION_TAG}"
                    bat "docker build -t  ${imageTag}."

                    //Push image
                    docker.withRegistry(${DOCKER_REGISTRY}, "${dockerhub-credentials}") {
                        docker.image(imageTag).push()
                    }
                }
            }
        }
        stage('Run Docker Container') {
            steps {
                script {
                    // Run the Docker container in the background (map port 8563 from container to host)
                    bat 'docker run -d -p 8563:8563 --name music-discovery-app music-discovery-app'
                    sleep 15
                }
            }
        }
        stage('Build') {
            steps {
                withCredentials([string(credentialsId: 'VITE_LAST_FM_API_KEY', variable: 'API_SECRET')]) {
                    bat 'npm install'
                    script {
                        bat 'start /B npm run dev'
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

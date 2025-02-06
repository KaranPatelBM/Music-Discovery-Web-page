pipeline {
    agent any
    stages {
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

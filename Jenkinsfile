pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                withCredentials([string(credentialsId: 'VITE_LAST_FM_API_KEY', variable: 'API_SECRET')]) {
                    bat 'npm install'
                    bat 'start /B npm run dev'
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
                build job: 'Playwright-Music-Discovery/master', wait: false
            }
        }
    }
}

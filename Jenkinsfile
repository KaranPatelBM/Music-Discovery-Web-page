pipeline {
    agent any
    environment {
        API_SECRET = credentials('VITE_LAST_FM_API_KEY')
    }
    stages {
        stage('Build') {
            steps {                
                withEnv(["VITE_LAST_FM_API_KEY=${API_SECRET}"]) {
                    sh 'npm run dev'
                }
            }
        }
        stage('Lint and Build') {
            steps {
                withEnv(["VITE_LAST_FM_API_KEY=${API_SECRET}"]) {
                    sh 'npm run lint'
                    sh 'npm run build'
                }
            }
        }
        stage('trigger test build job') {
            steps {
                build job: 'another-pipeline-job', wait: false
            }
        }
    }
}

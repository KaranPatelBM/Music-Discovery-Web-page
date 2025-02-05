pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                withCredentials([string(credentialsId: 'VITE_LAST_FM_API_KEY', variable: 'API_SECRET')]) {
                    sh 'npm run dev'
                }
            }
        }
        stage('Lint and Build') {
            steps {
                withCredentials([string(credentialsId: 'VITE_LAST_FM_API_KEY', variable: 'API_SECRET')]) {
                    sh 'npm run lint'
                    sh 'npm run build'
                }
            }
        }
        stage('trigger test build job') {
            // steps {
            //     build job: 'another-pipeline-job', wait: false
            // }
        }
    }
}

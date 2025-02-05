pipeline {
    agent any 
    enviroment {
        API_SECRET = {sdfsdfd}
    }
    stages {
        stage('Build') {
            steps {            
                sh 'npm run dev'
            }
        }
        stage('Lint and Build') {
            steps{
                sh 'npm run lint'
                sh 'npm run build'
            }
        }
        stage('trigger test build job') {
            steps {
                build job: 'another-pipeline-job', wait: false
            }
        }
    }
}
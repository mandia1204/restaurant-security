pipeline {
    agent any
    tools {nodejs "node"}
    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                ansiColor('xterm') {
                    sh 'npm run test'
                }
            }
        }
    }
    post {
        always {
            archiveArtifacts 'dist/**/*'
        }
    }
}
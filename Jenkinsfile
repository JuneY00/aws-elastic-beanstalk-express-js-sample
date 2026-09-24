
pipeline{
    agent any

    environment{
        IMAGE_NAME = 'juneyoo/isec6000-node-app'
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {
        stage("Install Dependencies"){
            agent {
                docker{
                    image 'node:16'
                    args '-u node'
                }
            }

            steps {
                sh 'npm ci'
            }
        }

        stage('Unit Test'){
            agent {
                docker{
                    image 'node:16'
                    args '-u node'
                }
            }
            steps {
                sh 'npm test'
            }

        }

        stage('Security Scan'){
            agent {
                docker{
                    image 'node:16'
                    args '-u node'
                }
            }
            steps {
                set +e
                sh 'npm audit --audit-level=high' > npm-audit.txt 2>&1 
                AUDIT_STATUS=$?
                cat npm-audit.txt
                exit $AUDIT_STAT
            }

        }
        
        stage('Build Docker Image'){
            steps {
                sh 'docker build -t ${IMAGE_NAME}:${IMAGE_TAG} -t ${IMAGE_NAME}:latest .'
            }

        }

        stage('Push Docker Image'){
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKERHUB_USERNAME',
                        passwordVariable: 'DOCKERHUB_TOKEN'
                    )
                ]){
                    sh '''
                        echo "$DOCKERHUB_TOKEN" | docker login -u "$DOCKERHUB_USERNAME" --password-stdin
                        docker push "${IMAGE_NAME}:${IMAGE_TAG}"
                        docker push "${IMAGE_NAME}:latest"

                        docker logout
                    '''
                }
            }

        }
    }

}
pipeline {
    agent any

    environment {
        HARBOR_REGISTRY = 'harbor.local'
        HARBOR_PROJECT  = 'homelab'
        IMAGE_NAME      = 'portfolio'
        IMAGE_TAG       = "${BUILD_NUMBER}"
        FULL_IMAGE      = "${HARBOR_REGISTRY}/${HARBOR_PROJECT}/${IMAGE_NAME}:${IMAGE_TAG}"
        LATEST_IMAGE    = "${HARBOR_REGISTRY}/${HARBOR_PROJECT}/${IMAGE_NAME}:latest"
        HARBOR_CREDS    = 'harbor-credentials'
        APP_DIR         = "${APPS_BASE}/portfolio-site"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Image') {
            steps {
                sh "docker build -t ${FULL_IMAGE} -t ${LATEST_IMAGE} ."
            }
        }

        stage('Push to Harbor') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: "${HARBOR_CREDS}",
                    usernameVariable: 'HARBOR_USER',
                    passwordVariable: 'HARBOR_PASS'
                )]) {
                    sh """
                        echo "\$HARBOR_PASS" | docker login ${HARBOR_REGISTRY} -u "\$HARBOR_USER" --password-stdin
                        docker push ${FULL_IMAGE}
                        docker push ${LATEST_IMAGE}
                        docker logout ${HARBOR_REGISTRY}
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                sh """
                    mkdir -p ${APP_DIR}
                    rsync -a --delete --exclude='.git' ${WORKSPACE}/ ${APP_DIR}/
                """
                withCredentials([usernamePassword(
                    credentialsId: "${HARBOR_CREDS}",
                    usernameVariable: 'HARBOR_USER',
                    passwordVariable: 'HARBOR_PASS'
                )]) {
                    sh """
                        echo "\$HARBOR_PASS" | docker login ${HARBOR_REGISTRY} -u "\$HARBOR_USER" --password-stdin
                        docker pull ${LATEST_IMAGE}
                        docker logout ${HARBOR_REGISTRY}

                        docker compose -f ${APP_DIR}/compose.yml up -d --force-recreate
                    """
                }
            }
        }
    }

    post {
        always {
            sh "docker image prune -f --filter 'until=24h'"
        }
        success {
            echo "Deployment succeeded — image: ${FULL_IMAGE}"
        }
        failure {
            echo "Pipeline failed. Check logs above."
        }
    }
}

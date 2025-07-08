pipeline {
  agent any

  environment {
    DOCKERHUB_CREDENTIALS = 'docker-hub-creds'      // ID poświadczeń w Jenkinsie
    IMAGE_NAME            = 'twojnick/myapp'       // zamień na swój Docker Hub login
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          // Tworzymy obraz z tagiem numeru builda
          dockerImage = docker.build("${IMAGE_NAME}:${env.BUILD_NUMBER}")
        }
      }
    }

    stage('Run Container Test') {
      steps {
        // Uruchamiamy kontener i odpalamy aplikację Node.js
        sh "docker run --rm ${IMAGE_NAME}:${env.BUILD_NUMBER} node app.js"
      }
    }

    stage('Push to Docker Hub') {
      when {
        expression { return true }  // ustaw na false, jeśli chcesz wyłączyć etap
      }
      steps {
        script {
          // Logujemy i wypychamy obraz do rejestru
          docker.withRegistry('https://index.docker.io/v1/', DOCKERHUB_CREDENTIALS) {
            dockerImage.push()
          }
        }
      }
    }
  }
}

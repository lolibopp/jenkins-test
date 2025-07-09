pipeline {
  agent any

  environment {
    DOCKERHUB_CREDENTIALS = credentials('docker-hub-friend-creds')
    IMAGE_NAME            = 'kacwery/myapp'
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
          // budujemy obraz i zapisujemy w globalnej zmiennej
          dockerImage = docker.build("${IMAGE_NAME}:${env.BUILD_NUMBER}")
        }
      }
    }

    stage('Run Container Test') {
      steps {
        script {
          // wewnątrz kontenera odpali się node app.js
          docker.image("${IMAGE_NAME}:${env.BUILD_NUMBER}").inside {
            sh 'node app.js'
          }
        }
      }
    }

    stage('Push to Docker Hub') {
      when {
        expression { return true }
      }
      steps {
        script {
          // logujemy się i wypychamy dwa tagi: BUILD_NUMBER i latest
          docker.withRegistry('https://index.docker.io/v1/', DOCKERHUB_CREDENTIALS) {
            dockerImage.push("${env.BUILD_NUMBER}")
            dockerImage.push('latest')
          }
        }
      }
    }
  }

  post {
    always {
      cleanWs()
    }
  }
}

pipeline {
  agent {
    docker {
      image 'node:18'
    }
  }
  stages {
    stage('Test') {
      steps {
        sh 'node -v'
      }
    }
  }
}
stage('Docker build') {
  steps {
    sh 'docker build -t myapp .'
  }
}
stage('Run container test') {
  steps {
    sh '''
      docker run --rm myapp echo "Aplikacja się uruchamia"
    '''
  }
}

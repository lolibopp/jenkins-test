pipeline {
  agent any

  triggers {
    githubPush()
  }

  stages {
    stage('Test hook') {
      steps {
        echo 'Webhook działa!'
      }
    }
  }
}

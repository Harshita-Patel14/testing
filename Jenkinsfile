pipeline {
    agent any
    tools {nodejs "node"}
    stages {
       stage('Install and Setup') {
      parallel {
        stage('NPM Install') {
          steps {
            sh 'npm ci'
          }
        }
      }
    }
        stage('Test Run') {
                 steps {
                    sh 'npm run test:vrt'
                 }
                 }
    }
    post {
        always {
            mail to: 'harshitap@mitrmedia.com',
            subject: "Jenkins Build: ${currentBuild.fullDisplayName}",
            body: "${currentBuild.result}Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}"
        }
    }
}

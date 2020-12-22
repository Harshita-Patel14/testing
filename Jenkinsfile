pipeline {
    agent any

    stages {
        stage('One') {
                 steps {
                     echo 'Step One'
                 }
                 }

        stage('Two') {
                 steps {
                     echo 'Step Two'
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
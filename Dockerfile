FROM tomcat:9.0-jre8
COPY target/*.war /usr/local/tomcat/webapps/xashy-webapp.war
FROM centos:latest
LABEL maintainer="jeff.downing@aitengineering.com"
ENV MONGO_INTERNAL_ADDR="172.17.0.2"
RUN yum update -y

RUN curl -sL https://rpm.nodesource.com/setup_11.x | bash -
RUN yum install -y nodejs

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 8080

CMD [ "npm", "start" ]
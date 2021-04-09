#1 베이스 이미지

FROM ubuntu:18.04 MAINTAINER Seongmin "ltxctdbnn@gmail.com"

 

#2 환경변수 설정

ENV LANG C.UTF-8

ENV DEBIAN_FRONTEND noninteractive

 

#3 필요한 프로그램 설치

 

#3-1 apt 패키지 업데이트

RUN apt-get update && apt-get -y upgrade

 

#3-2 기본 프로그램 설치

RUN apt-get update

RUN apt-get install -y sudo net-tools wget nano lsof curl gnupg gnupg2 gnupg1

 

#3-3 Git 설치

RUN apt-get install -y git

 

#3-4 Node.js 버전 세팅 및 설치

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -

RUN apt-get install -y nodejs

RUN apt-get install -y gcc g++ make

FROM quay.io/maherzubair/sigma-md:beta
RUN git clone https://github.com/Bladeh4x/BLADE-MD /root/BLADE-MD
WORKDIR /root/BLADE-MD/
RUN npm install npm@latest
RUN npm install
EXPOSE 8000
CMD ["npm", "start"]
 

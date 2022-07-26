FROM nginx:1.17.3-alpine
RUN mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf_disabled
COPY public /usr/share/nginx/html
#RUN mkdir /usr/share/nginx/html/m
#RUN mkdir /usr/share/nginx/html/m/images
#COPY public/images /usr/share/nginx/html/m/images
#COPY public/*.pdf /usr/share/nginx/html/m/
#RUN mv /usr/share/nginx/html/index.mobile.html usr/share/nginx/html/m/index.html
#RUN mv /usr/share/nginx/html/mobile.styles.css usr/share/nginx/html/m
#RUN mv /usr/share/nginx/html/mobile.*.js usr/share/nginx/html/m
COPY proxy_server.conf /etc/nginx/conf.d
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
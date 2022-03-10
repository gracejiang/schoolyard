cd /home/ec2-user/schoolyard

# install npm and node
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install v14.18.1

cd ../frontend
cp -R ./build/* /var/www/react/

cd ../backend
npx kill-port 8083 # kill the previously run backend
PORT=8083 nohup npm start & # port 8083 will be mapped to 8082 by Apache2's reverse proxy defined in /etc/httpd/conf/httpd.conf
cd /home/ec2-user/schoolyard
sudo chown ec2-user . -R
sudo chmod 755 . -R
cp ~/app-secrets/.env ./backend/.env

# install npm and node
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install v14.18.1

cd backend
npm install
PORT=8083 npm start & # port 8083 will be mapped to 8082 by Apache2's reverse proxy defined in /etc/httpd/conf/httpd.conf

cd ../frontend
npm install
npm build
cp build /var/www/react/

cd ../
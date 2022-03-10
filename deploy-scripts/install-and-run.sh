cd /home/ec2-user/schoolyard
sudo chown ec2-user . -R
sudo chmod 755 . -R
cp ~/app-secrets/.env ./backend/.env

cd backend
/home/ec2-user/.nvm/versions/node/v14.18.1/bin/npm install
/home/ec2-user/.nvm/versions/node/v14.18.1/bin/npm start &

cd ../frontend
/home/ec2-user/.nvm/versions/node/v14.18.1/bin/npm install
/home/ec2-user/.nvm/versions/node/v14.18.1/bin/npm build
cp build /var/www/react/

cd ../
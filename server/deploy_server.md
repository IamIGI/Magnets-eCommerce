## Deploying MERN Stack Project on Hostinger VPS

Documentation source: https://www.youtube.com/watch?v=o2J_jdKBLI4

- Preparing the VPS Environment
- Setting Up the MongoDB Database
- Deploying the Express and Node.js Backend
- Deploying the React Frontends
- Configuring Nginx as a Reverse Proxy
- Setting Up SSL Certificates

### 1. Preparing the VPS Environment

Log in to Your VPS in Terminal

```bash
 ssh root@your_vps_ip
```

Update and Upgrade Your System

```bash
  sudo apt update
```

```bash
  sudo apt upgrade -y
```

Install Node.js and npm ( if not pre-installed)

```bash
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
```

```bash
  sudo apt-get install -y nodejs
```

Install Git

```bash
  sudo apt install -y git
```

### 2. Setting Up the MongoDB Database

If you want to setup MongoDB on VPS Follow this Guide: [click here](https://github.com/GreatStackDev/notes/blob/main/MongoDB_Setup_on_VPS.md)

### 3. Deploying the Express and Node.js Backend

Clone Your Backend Repository

```bash
 mkdir /var/www
```

```bash
 cd /var/www
```

```bash
 git clone https://github.com/IamIGI/Magnets-eCommerce.git
```

```bash
 cd your-repo/backend
```

Install Dependencies

```bash
 npm install
```

Create .env file & configure Environment Variables (edit also if exists)

```bash
 nano .env
```

add environment variables then save and exit (Ctrl + X, then Y and Enter).

Check content

```bash
 cat .env
```

Installing pm2 to Start Backend

```bash
 npm install -g pm2
```

```bash
 pm2 start dist/index.js --name magnets-server
```

Start Backend on VPS startup (when you restart VPS, the server will startup automatically)

```bash
 pm2 startup
```

```bash
 pm2 save
```

Server status:

```bash
 pm2 list
```

Server logs:

```bash
 pm2 logs magnets-server --lines 1000
```

Server logs in real-time:

```bash
 pm2 logs magnets-server
```

Save to file

```bash
 pm2 logs magnets-server --lines 1000 > magnets-server-logs.txt
```

Restart server

```bash
 pm2 restart magnets-server
```

-----------------FIREWALL(config)--------------
Allowing backend port in firewall

```bash
 sudo ufw status
```

If firewall is disable then enable it using

```bash
 sudo ufw enable
```

```bash
 sudo ufw allow 'OpenSSH'
```

```bash
 sudo ufw allow 4000
```

### 4. Deploying the React Frontends

Creating Build of React Applications

```bash
 cd path-to-your-first-react-app
```

```bash
 npm install
```

If you have ".env" file in your project

Create .env file and paste the variables

```bash
 nano .env
```

Create build of project

```bash
 npm run build
```

Repeat for the second or mulitiple React app.

Install Nginx

```bash
 sudo apt install -y nginx
```

adding Nginx in firewall

```bash
 sudo ufw status
```

```bash
 sudo ufw allow 'Nginx Full'
```

Configure Nginx for React Frontends

```bash
 nano /etc/nginx/sites-available/igitest.pl.conf
```

```bash
 server {
    listen 80;
    server_name igitest.pl www.igitest.pl;

    location / {
        root /var/www/Magnets-eCommerce/client/dist;
        try_files $uri /index.html;
    }
}
```

Save and exit (Ctrl + X, then Y and Enter).

Create a similar file for the second or multiple React app.

```bash
 nano /etc/nginx/sites-available/yourdomain2.com.conf
```

```bash
server {
    listen 80;
    server_name admin.igitest.pl;

    location / {
        root /var/www/Magnets-eCommerce/admin-client/dist;
        try_files $uri /index.html;
    }
}
```

Create symbolic links to enable the sites.

```bash
ln -s /etc/nginx/sites-available/igitest.pl.conf /etc/nginx/sites-enabled/
```

```bash
ln -s /etc/nginx/sites-available/admin.igitest.pl.conf /etc/nginx/sites-enabled/
```

Test the Nginx configuration for syntax errors.

```bash
nginx -t
```

Restart the Nginx server

```bash
sudo systemctl restart nginx
```

Now both domains should work and be able to connect to server:
(remember about .env files)

ADMIN: admin.igitest.pl
page: igitest.pl

### 5. Configuring Nginx as a Reverse Proxy

Update Backend Nginx Configuration (so backend will be available via domain name)

```bash
nano /etc/nginx/sites-available/api.igitest.pl.conf
```

PORT: backend server port

```bash
server {
    listen 80;
    server_name api.igitest.pl;

    location / {
        proxy_pass http://localhost:4000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Create symbolic links to enable the sites.

```bash
ln -s /etc/nginx/sites-available/api.igitest.pl.conf /etc/nginx/sites-enabled/
```

Restart nginx

```bash
systemctl restart nginx
```

### Connect Domain Name with Website

Point all your domain & sub-domain on VPS IP address by adding DNS records in your domain manager

Now your website will be live on domain name
![alt text](image.png)

### 6. Setting Up SSL Certificates

Install Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
```

Obtain SSL Certificates

```bash
certbot --nginx -d igitest.pl -d www.igitest.pl -d admin.igitest.pl -d api.igitest.pl
```

Verify Auto-Renewal

```bash
certbot renew --dry-run
```

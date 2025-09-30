# Deployment Guide

This guide covers deploying the Women's E-Commerce Platform to production.

## Prerequisites

- Domain name (optional but recommended)
- Cloud hosting account (AWS, DigitalOcean, Heroku, etc.)
- PostgreSQL database (cloud-hosted)
- Stripe account with production keys

## Option 1: Deploy to Vercel (Frontend) + Railway/Render (Backend)

### Backend Deployment (Railway)

1. **Create Railway Account**: Sign up at https://railway.app

2. **Create New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your repository
   - Select the backend directory

3. **Add PostgreSQL Database**:
   - Click "New" → "Database" → "PostgreSQL"
   - Railway will automatically create and connect the database

4. **Configure Environment Variables**:
   ```
   DATABASE_URL=<provided by Railway>
   JWT_SECRET=<your-production-secret>
   JWT_EXPIRES_IN=7d
   STRIPE_SECRET_KEY=<your-stripe-production-key>
   STRIPE_WEBHOOK_SECRET=<your-webhook-secret>
   NODE_ENV=production
   FRONTEND_URL=<your-frontend-url>
   PORT=5000
   ```

5. **Deploy**:
   - Railway will automatically build and deploy
   - Run migrations: `npx prisma migrate deploy`
   - Seed database: `npm run seed`

### Frontend Deployment (Vercel)

1. **Create Vercel Account**: Sign up at https://vercel.com

2. **Import Project**:
   - Click "New Project"
   - Import from GitHub
   - Select your repository
   - Set root directory to `frontend`

3. **Configure Build Settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Configure Environment Variables**:
   ```
   VITE_API_URL=<your-backend-url>/api
   VITE_STRIPE_PUBLIC_KEY=<your-stripe-public-key>
   ```

5. **Deploy**: Vercel will automatically build and deploy

## Option 2: Deploy to DigitalOcean (Full Stack)

### 1. Create Droplet

```bash
# Create Ubuntu 22.04 droplet
# Minimum: 2GB RAM, 1 vCPU
```

### 2. Initial Server Setup

```bash
# SSH into server
ssh root@your-server-ip

# Update system
apt update && apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Install PostgreSQL
apt install -y postgresql postgresql-contrib

# Install Nginx
apt install -y nginx

# Install PM2 (Process Manager)
npm install -g pm2
```

### 3. Setup PostgreSQL

```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE women_ecommerce;
CREATE USER ecommerce_user WITH PASSWORD 'your-secure-password';
GRANT ALL PRIVILEGES ON DATABASE women_ecommerce TO ecommerce_user;
\q
```

### 4. Clone and Setup Application

```bash
# Create app directory
mkdir -p /var/www/ecommerce
cd /var/www/ecommerce

# Clone repository
git clone your-repo-url .

# Setup Backend
cd backend
npm install
cp .env.example .env
# Edit .env with production values
nano .env

# Run migrations
npx prisma generate
npx prisma migrate deploy
npm run seed

# Build backend
npm run build

# Setup Frontend
cd ../frontend
npm install
cp .env.example .env
# Edit .env with production values
nano .env

# Build frontend
npm run build
```

### 5. Configure PM2

```bash
# Start backend with PM2
cd /var/www/ecommerce/backend
pm2 start dist/server.js --name ecommerce-backend

# Save PM2 configuration
pm2 save
pm2 startup
```

### 6. Configure Nginx

```bash
# Create Nginx configuration
nano /etc/nginx/sites-available/ecommerce
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Frontend
    location / {
        root /var/www/ecommerce/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Enable the site:

```bash
ln -s /etc/nginx/sites-available/ecommerce /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### 7. Setup SSL with Let's Encrypt

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal is configured by default
```

## Option 3: Deploy to AWS (Elastic Beanstalk + RDS)

### Backend (Elastic Beanstalk)

1. **Install EB CLI**:
```bash
pip install awsebcli
```

2. **Initialize EB**:
```bash
cd backend
eb init
```

3. **Create Environment**:
```bash
eb create production-env
```

4. **Configure Environment Variables** in AWS Console

### Frontend (S3 + CloudFront)

1. **Build Frontend**:
```bash
cd frontend
npm run build
```

2. **Create S3 Bucket** and enable static website hosting

3. **Upload Files**:
```bash
aws s3 sync dist/ s3://your-bucket-name
```

4. **Setup CloudFront** for CDN

## Database Migration

For production database setup:

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations (IMPORTANT: Backup database first!)
npx prisma migrate deploy

# Seed production data (optional)
npm run seed
```

## Environment Variables Checklist

### Backend (.env)
- [ ] `DATABASE_URL` - Production PostgreSQL URL
- [ ] `JWT_SECRET` - Strong random string
- [ ] `STRIPE_SECRET_KEY` - Production Stripe key
- [ ] `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
- [ ] `NODE_ENV=production`
- [ ] `FRONTEND_URL` - Production frontend URL
- [ ] `PORT` - Server port (usually 5000)

### Frontend (.env)
- [ ] `VITE_API_URL` - Production API URL
- [ ] `VITE_STRIPE_PUBLIC_KEY` - Production Stripe public key

## Post-Deployment Checklist

- [ ] Test user registration and login
- [ ] Test product browsing and search
- [ ] Test add to cart functionality
- [ ] Test checkout process
- [ ] Test order placement (with test card)
- [ ] Test admin panel access
- [ ] Verify email notifications (if configured)
- [ ] Test on mobile devices
- [ ] Check SSL certificate
- [ ] Setup monitoring (New Relic, Datadog, etc.)
- [ ] Configure backup strategy
- [ ] Setup error tracking (Sentry)
- [ ] Configure analytics (Google Analytics)

## Monitoring

### Setup PM2 Monitoring

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

### Monitor Logs

```bash
# View logs
pm2 logs

# Monitor processes
pm2 monit
```

## Backup Strategy

### Database Backup

```bash
# Create backup script
nano /usr/local/bin/backup-db.sh
```

Add:
```bash
#!/bin/bash
pg_dump women_ecommerce > /backups/db-$(date +%Y%m%d-%H%M%S).sql
```

Setup cron job:
```bash
crontab -e
# Add: 0 2 * * * /usr/local/bin/backup-db.sh
```

## Scaling Considerations

### Horizontal Scaling
- Use load balancer (Nginx, AWS ELB)
- Multiple backend instances with PM2 cluster mode
- Redis for session management and caching

### Database Scaling
- Read replicas for query distribution
- Connection pooling with Prisma
- Database indexing optimization

### CDN
- Use CloudFlare or AWS CloudFront
- Cache static assets
- Optimize images

## Security Hardening

1. **Firewall Configuration**:
```bash
ufw allow 22
ufw allow 80
ufw allow 443
ufw enable
```

2. **Disable Root Login**:
```bash
nano /etc/ssh/sshd_config
# Set: PermitRootLogin no
systemctl restart sshd
```

3. **Setup Fail2Ban**:
```bash
apt install -y fail2ban
systemctl enable fail2ban
```

4. **Regular Updates**:
```bash
apt update && apt upgrade -y
```

## Troubleshooting

### Backend Not Starting
- Check PM2 logs: `pm2 logs`
- Verify environment variables
- Check database connection
- Review Nginx error logs: `tail -f /var/log/nginx/error.log`

### Database Connection Issues
- Verify DATABASE_URL format
- Check PostgreSQL is running: `systemctl status postgresql`
- Test connection: `psql -U username -d dbname`

### Frontend Not Loading
- Check Nginx configuration: `nginx -t`
- Verify build files exist in dist folder
- Check browser console for errors
- Verify API_URL is correct

## Maintenance

### Update Application

```bash
# Pull latest changes
cd /var/www/ecommerce
git pull

# Update backend
cd backend
npm install
npm run build
npx prisma migrate deploy
pm2 restart ecommerce-backend

# Update frontend
cd ../frontend
npm install
npm run build

# Reload Nginx
systemctl reload nginx
```

## Cost Optimization

- Use CDN for static assets (reduce bandwidth)
- Implement caching (Redis)
- Optimize database queries
- Use smaller server instances initially
- Monitor and scale based on usage

## Support

For deployment issues:
1. Check logs first
2. Review environment variables
3. Test connections (database, API)
4. Verify firewall rules
5. Check SSL certificate validity

---

**Remember**: Always test deployments in a staging environment before production!
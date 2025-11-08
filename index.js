import express from 'express';
import Product from './models/product.js';
import user_controller from './controllers/user.js'
import admin_controller from './controllers/admin.js';
import session from 'express-session';
import { dirname } from 'path';
import { fileURLToPath } from 'url';


const file = fileURLToPath(import.meta.url); // Menggunakan 'fileURLToPath' untuk mendapatkan jalur berkas (file path) dari URL modul ini.
const dir = dirname(file);

const app = express();
const port = 3000;
app.use(express.static(dir));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'ini adalah kode secret###',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));

app.set('view engine', 'ejs');
app.get("/login", user_controller.login);
app.get("/logout", user_controller.logout);
app.post("/login", user_controller.auth);

app.get('/index', admin_controller, (req, res) => {
    Product.findAll().then((results) => {
        res.render('admin/index', { products: results, admin: req.session.admin || "" });
    });
})
app.get('/index', (req, res) => {
    Product.findAll().then((results) => {
        res.render('index', { products: results, user: req.session.user || "" });
    });
})



app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/cart',(req,res)=>{
    res.render('cart')
})
app.get('/',(req,res)=>{
    res.render('indexa')
})

app.get('/register',(req,res)=>{
    res.render('register')
})
app.post('/register',user_controller.register);


app.get('/about',(req,res)=>{
    res.render('about')
})
app.get('/shop',admin_controller,(req,res)=>{
    res.render('admin/shop')
})

app.get('/shop',(req,res)=>{
    res.render('shop')
})


app.get('/contact',(req,res)=>{
    res.render('contact')
})
app.get('/shipping',(req,res)=>{
    res.render('shipping')
})
app.get('/create', (req, res) => {
    res.render('create');
})

app.post('/api/products', (req, res) => {
    Product.create({ nama: req.body.nama, harga: req.body.harga, gambar:req.body.gambar }
    ).then((results) => {
        res.json({ status: 200, error: null, Response: results });
    }).catch(err => {
        res.json({ status: 502, error: err });
    })
})

app.put('/api/product/:id', (req, res) => {
    Product.update(
        { nama: req.body.nama, harga: req.body.harga, gambar: req.body.gambar },
        { where: { id: req.params.id } }
    ).then((results) => {
        res.json({ status: 200, error: null, Response: results });
    }).catch(err => {
        res.json({ status: 502, error: err });
    });
});

app.get('/edit/:id', (req, res) => {
    Product.findOne({ where: { id: req.params.id } }
    ).then((results) => {
        res.render('edit', { product: results });
    })
})

app.delete('/api/product/:id',admin_controller, (req, res) => {
    Product.destroy({ where: { id: req.params.id } }
    ).then(() => {
        res.json({ status: 200, error: null, Response: results });
    }).catch(err => {
        res.json({ status: 500, error: err, Response: {} });
    })
})
app.get("/css",(req,res)=>{
    res.sendFile(dir+'/style.css') // Mengirim file CSS (style.css) sebagai respons saat diakses.
})

app.get('/payment',(req,res)=>{
    res.render('payment')
})
app.get('/otp',(req,res)=>{
    res.render('otp')
})
app.get('/logo',(req,res)=>{
    res.sendFile(dir+'/img/Logo Removal.png')   // Mengirim file gambar (Logo Removal.png) sebagai respons saat URL  diakses.
})
app.get('/Banner',(req,res)=>{
    res.sendFile(dir+'/img/bann.jpg')     // Mengirim file gambar (bann.jpg) sebagai respons saat URL  diakses.
})

app.get('/B17',(req,res)=>{
    res.sendFile(dir+'/img/banner/b17.jpg')    // Mengirim file gambar (b17.jpg) dari folder "banner" respon diakses.
})

app.get('/B10',(req,res)=>{
    res.sendFile(dir+'/img/banner/b10.jpg')    // Mengirim file gambar (b10.jpg) dari folder "banner" respon diakses.
})

app.get('/BannerAbout',(req,res)=>{
    res.sendFile(dir+'/img/backgroundt.jpg')// Mengirim file gambar (backgroundt.jpg) " respon diakses.
})

app.get('/B7',(req,res)=>{
    res.sendFile(dir+'/img/banner/b7.jpg')// Mengirim file gambar (b7.jpg) dari folder "banner"" respon diakses.
})

app.get('/B4',(req,res)=>{
    res.sendFile(dir+'/img/banner/b4.jpg')// Mengirim file gambar (b4.jpg) dari folder "banner"" respon diakses.
})

app.get('/B18',(req,res)=>{
    res.sendFile(dir+'/img/banner/b18.jpg')// Mengirim file gambar (b18.jpg) dari folder "banner"" respon diakses
})

app.get('/B14',(req,res)=>{
    res.sendFile(dir+'/img/banner/b14.png') // Mengirim file gambar (b14.jpg) dari folder "banner" respon diakses
})

app.get('/Gamb',(req,res)=>{
    res.sendFile(dir+'/img/bnn.png')
})

app.get('/BannerSho',(req,res)=>{
    res.sendFile(dir+'/img/banner.jpg')// Mengirim file gambar banner.jpg dari  respon diakses
})

app.get('/button',(req,res)=>{
    res.sendFile(dir+'/img/button.png')
})
app.get('/gambar1',(req,res)=>{
    res.sendFile(dir+'/img/features/f1.png')// Mengirim file gambar f1.png dari folder "features" respon diakses
})

app.get('/gambar2',(req,res)=>{
    res.sendFile(dir+'/img/features/f2.png')
})

app.get('/gambar3',(req,res)=>{
    res.sendFile(dir+'/img/features/f3.png')// Mengirim file gambar f3.png dari folder "features" respon diakses
})

app.get('/gambar4',(req,res)=>{
    res.sendFile(dir+'/img/features/f4.png')
})

app.get('/gambar5',(req,res)=>{
    res.sendFile(dir+'/img/features/f5.png')// Mengirim file gambar f4.png dari folder "features" respon diakses
})

app.get('/gambar6',(req,res)=>{
    res.sendFile(dir+'/img/features/f6.png')
})

app.listen(port, () => {
    console.log(`Server Running at http://localhost:${port}`);
})
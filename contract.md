#API Contract

# Database Design

## Users

- name
- fullName
- IDCard
- address
- username
- password
- bankAccount
- email
- phoneNumber
- role
- profilImage

## FarmerStocks

- item
- grade
- qty
- price
- unit
- owner

## MaterialStocks

- item
- unit
- qty
- sellPrice
- buyPrice
- owner

## PackageStocks

- item
- unit
- qty
- sellPrice
- buyPrice
- owner

## FactoryStocks

- item
- unit
- qty
- weight
- buyPrice
- sellPrice
- owner
- type

## OutletStocks

- item
- itemImage
- weight
- buyPrice
- sellPrice
- owner

## Cashiers

- username
- password
- fullName
- workingOn

## Transaction

- from
- to
- total
- itemDetail : object
- proof
- status
- name

## POs

- itemDetail : Object
- total
- owner
- byCashier

# Route

## Authorization

1. Login

   - Method : POST
   - Link : /auth/login
   - Request Body (JSON) :
     - username - String
     - password - String
   - Response (JSON) :
     - 200
     ```
     message : Successful Login
     user : user.data
     token : token
     ```
     - 406
     ```
     message : Wrong username or password
     ```
     - 500
     ```
     message : error.message
     ```

2. Registration
   - Method : POST
   - Link : /auth/register
   - Request Body (Multipart Form) :
     - name - String
     - fullName - String
     - address - String
     - birthDate - Date (YYYY-MM-DD)
     - phoneNumber - String
     - email - String
     - username - String
     - password - String
     - IDCard - File
     - bankAccount - String
     - bankNumber - String
     - role - Enum (0 | 1 | 2 | 3 | 4 | 5)
   - Response (JSON) :
     - 200
     ```
     message : User Registered
     data : user.data
     ```
     - 406
     ```
     message : Field still empty
     ```
     - 500
     ```
     message : error.message
     ```

# Aktor Route

## Petani

1. Get Homepage

   - Method : GET
   - Link : /petani/
   - (Required) header : Authorization : bearer token
   - Response (JSON) :
     - 200
     ```
     message : "Success"
     data :
     ```
     - 500
     ```
     message: error message
     ```

2. Get Laporan Penjualan

   - Method : GET
   - Link : /petani/laporan/penjualan
   - (Required) header : Authorization : bearer token
   - Response (JSON) :
     - 200
     ```
     message : "Success"
     data : dataPenjualan
     ```
     - 500
     ```
     message: error message
     ```

3. Get Laporan Stok Panen

   - Method : GET
   - Link : /petani/laporan/stok-panen
   - (Required) header : Authorization : bearer token
   - Response (JSON) :
     - 200
     ```
     message : "Success"
     data : data Stok Panen
     ```
     - 500
     ```
     message: error message
     ```

4. Post Data Stok Panen
   - Method : POST
   - Link : /petani/laporan
   - (Required) header : Authorization : bearer token
   - Request Body (JSON) :
     - item : String
     - grade : char(1)
     - qty : number
     - price : integer
     - unit : string
   - Response (JSON) :
     - 200
     ```
     message : "Success"
     data : Stok yang ditambahkan
     ```
     - 500
     ```
     message: error message
     ```
5. Get Lihat Stok

   - Method : GET
   - Link : /petani/lihat-stok
   - (Required) header : Authorization : bearer token
   - Response (JSON) :
     - 200
     ```
     message : "Success"
     data : Stocks
     ```
     - 500
     ```
     message : error message
     ```

6. Get Riwayat Transaksi
   - Method : GET
   - Link : /petani/riwayat-transaksi
   - (Required) header : Authorization : bearer token
   - Response (JSON) :
     - 200
     ```
     message : "Success"
     data : Transaksi
     ```
     - 500
     ```
     message : error message
     ```
7. Konfirmasi Pembayaran
   - Method : POST
   - Link : /bahan-tambahan/konfirmasi-pembayaran
   - (Required) header : Authorization : bearer token
   - Request Body : (JSON)
     - id - integer
   - response (JSON) :
     - 200
     ```
     message : "Success"
     data : {FarmerStocks}
     ```
     - 500
     ```
     status: "error"
     message: error message
     ```

## Pemasok Bahan Tambah

1. Get Homepage

   - Method : GET
   - Link : /bahan-tambahan/
   - (Required) header : Authorization : bearer token
   - Response (JSON) :
     - 200
     ```
     message : "Success"
     data : {totalStok, riwayatTransaksi}
     ```
     - 500
     ```
     message: error message
     ```

2. Get Laporan Penjualan

   - Method : GET
   - Link : /bahan-tambahan/laporan/penjualan
   - (Required) header : Authorization : bearer token
   - Response (JSON) :
     - 200
     ```
     message : "Success"
     data : dataPenjualan
     ```
     - 500
     ```
     message: error message
     ```

3. Get Laporan Pembelian

   - Method : GET
   - Link : /bahan-tambahan/laporan/pembelian
   - (Required) header : Authorization : bearer token
   - Response (JSON) :
     - 200
     ```
     message : "Success"
     data : dataPembelian
     ```
     - 500
     ```
     message: error message
     ```

4. Post Data Pembelian
   - Method : POST
   - Link : /bahan-tambahan/laporan
   - (Required) header : Authorization : bearer token
   - Request Body (JSON) :
     - item : String
     - unit : string
     - qty : number
     - sellPrice : integer
     - buyPrice : integer
   - Response (JSON) :
     - 200
     ```
     message : "Success"
     data : Stok yang ditambahkan
     ```
     - 500
     ```
     message: error message
     ```
5. Get Lihat Stok

   - Method : GET
   - Link : /bahan-tambahan/lihat-stok
   - (Required) header : Authorization : bearer token
   - Response (JSON) :
     - 200
     ```
     message : "Success"
     data : Stocks
     ```
     - 500
     ```
     message : error message
     ```

6. Get Riwayat Transaksi
   - Method : GET
   - Link : /bahan-tambahan/riwayat-transaksi
   - (Required) header : Authorization : bearer token
   - Response (JSON) :
     - 200
     ```
     message : "Success"
     data : Transaksi
     ```
     - 500
     ```
     message : error message
     ```
7. Konfirmasi Pembayaran
   - Method : POST
   - Link : /bahan-tambahan/konfirmasi-pembayaran
   - (Required) header : Authorization : bearer token
   - Request Body : (JSON)
     - id - integer
   - response (JSON) :
     - 200
     ```
     message : "Success"
     data : {MaterialStocks}
     ```
     - 500
     ```
     status: "error"
     message: error message
     ```

## Pemasok Kemasan

1. Get Homepage

   - Method : GET
   - Link : /kemasan/
   - (Required) header : Authorization : bearer token
   - Response (JSON) :
     - 200
     ```
     message : "Success"
     data : {totalStok, riwayatTransaksi}
     ```
     - 500
     ```
     message: error message
     ```

2. Get Laporan Penjualan

   - Method : GET
   - Link : /kemasan/laporan/penjualan
   - (Required) header : Authorization : bearer token
   - Response (JSON) :
     - 200
     ```
     message : "Success"
     data : dataPenjualan
     ```
     - 500
     ```
     message: error message
     ```

3. Get Laporan Stok Kemasan

   - Method : GET
   - Link : /kemasan/laporan/stok-kemasan
   - (Required) header : Authorization : bearer token
   - Response (JSON) :
     - 200
     ```
     message : "Success"
     data : dataPembelian
     ```
     - 500
     ```
     message: error message
     ```

4. Post Data Pembelian

   - Method : POST
   - Link : /kemasan/laporan
   - (Required) header : Authorization : bearer token
   - Request Body (JSON) :
     - item : String
     - unit : string
     - qty : number
     - sellPrice : integer
     - buyPrice : integer
   - Response (JSON) :
     - 200
     ```
     message : "Success"
     data : Stok yang ditambahkan
     ```
     - 500
     ```
     message: error message
     ```

5. Get Lihat Stok

   - Method : GET
   - Link : /kemasan/lihat-stok
   - (Required) header : Authorization : bearer token
   - Response (JSON) :
     - 200
     ```
     message : "Success"
     data : Stocks
     ```
     - 500
     ```
     message : error message
     ```

6. Get Riwayat Transaksi

   - Method : GET
   - Link : /kemasan/riwayat-transaksi
   - (Required) header : Authorization : bearer token
   - Response (JSON) :
     - 200
     ```
     message : "Success"
     data : Transaksi
     ```
     - 500
     ```
     message : error message
     ```

7. Konfirmasi Pembayaran
   - Method : POST
   - Link : /kemasan/konfirmasi-pembayaran
   - (Required) header : Authorization : bearer token
   - Request Body : (JSON)
     - id - integer
   - response (JSON) :
     - 200
     ```
     message : "Success"
     data : {PackageStocks}
     ```
     - 500
     ```
     status: "error"
     message: error message
     ```

## UMKM

1. Get Homepage

   - Method : GET
   - Link : /umkm/
   - (Required) header : Authorization : bearer token
   - Response (JSON) :
     - 200
     ```
     message : "Success"
     data : {totalStok, riwayatTransaksi}
     ```
     - 500
     ```
     message: error message
     ```

2. Get Laporan Penjualan

   - Method : GET
   - Link : /umkm/laporan/penjualan
   - (Required) header : Authorization : bearer token
   - Response (JSON) :
     - 200
     ```
     message : "Success"
     data : dataPenjualan
     ```
     - 500
     ```
     message: error message
     ```

3. Get Laporan Pembelian

   - Method : GET
   - Link : /umkm/laporan/pembelian
   - (Required) header : Authorization : bearer token
   - Response (JSON) :
     - 200
     ```
     message : "Success"
     data : dataPembelian
     ```
     - 500
     ```
     message: error message
     ```

4. Get Laporan Produksi

   - Method : GET
   - Link : /umkm/laporan/produksi
   - (Required) header : Authorization : bearer token
   - Response (JSON) :
     - 200
     ```
     message : "Success"
     data : dataProduksi
     ```
     - 500
     ```
     message: error message
     ```

5. Post Data Pembelian

   - Method : POST
   - Link : /umkm/laporan
   - (Required) header : Authorization : bearer token
   - Request Body (JSON) :
     - item : String
     - weight : string
     - qty : number
     - sellPrice : integer
     - buyPrice : integer
     - type : integer (1 | 2)
   - Response (JSON) :
     - 200
     ```
     message : "Success"
     data : Stok yang ditambahkan
     ```
     - 500
     ```
     message: error message
     ```

6. Get Lihat Stok Bahan

   - Method : GET
   - Link : /umkm/lihat-stok/bahan
   - (Required) header : Authorization : bearer token
   - Response (JSON) :
     - 200
     ```
     message : "Success"
     data : Stocks
     ```
     - 500
     ```
     message : error message
     ```

7. Get Lihat Stok Produk

   - Method : GET
   - Link : /umkm/lihat-stok/produk
   - (Required) header : Authorization : bearer token
   - Response (JSON) :
     - 200
     ```
     message : "Success"
     data : Stocks
     ```
     - 500
     ```
     message : error message
     ```

8. Get Riwayat Transaksi

   - Method : GET
   - Link : /umkm/riwayat-transaksi
   - (Required) header : Authorization : bearer token
   - Response (JSON) :
     - 200
     ```
     message : "Success"
     data : Transaksi
     ```
     - 500
     ```
     message : error message
     ```

9. Get Beli Bahan Baku
   - Method : GET
   - Link : /umkm/beli-bahan/bahan-baku
   - (Required) header : Authorization : bearer token
   - Response (JSON) :
     - 200
     ```
     message : "Success"
     data : {FarmerStocks}
     ```
     - 500
     ```
     message : error message
     ```
10. Get Beli Bahan Tambahan
    - Method : GET
    - Link : /umkm/beli-bahan/bahan-tambahan
    - (Required) header : Authorization : bearer token
    - Response (JSON) :
      - 200
      ```
      message : "Success"
      data : {MaterialStocks}
      ```
      - 500
      ```
      message : error message
      ```
11. Get Beli Kemasan
    - Method : GET
    - Link : /umkm/beli-bahan/kemasan
    - (Required) header : Authorization : bearer token
    - Response (JSON) :
      - 200
      ```
      message : "Success"
      data : {PackageStocks}
      ```
      - 500
      ```
      message : error message
      ```
12. Get Detail Toko
    - Method : GET
    - Link : /umkm/detail-toko/:idToko
    - Required params : idToko - integer
    - (Required) header : Authorization : bearer token
    - Response (JSON) :
      - 200
      ```
      message : "Success"
      data : {Users, Stocks}
      ```
      - 500
      ```
      message : error message
      ```
13. Post Pesan Bahan
    - Method : POST
    - Link : /umkm/beli-bahan
    - (Required) header : Authorization : bearer token
    - Request Body :
      - from : integer
      - total : integer
      - items : Object
    - Response (JSON) :
      - 200
      ```
      message : "Success"
      data : {Transactions}
      ```
      - 500
      ```
      message : error message
      ```
14. Post Bayar Transaksi
    - Method : POST
    - Link : /umkm/bayar-transaksi
    - (Required) header : Authorization : bearer token
    - Request Body :
      - id : integer
      - file : file
    - Response (JSON) :
      - 200
      ```
      message : "Success"
      data : {Transactions}
      ```
      - 500
      ```
      message : error message
      ```
15. Post Konfirmasi Pembayaran
    - Method : POST
    - Link : /umkm/konfirmasi-pembayaran
    - (Required) header : Authorization : bearer token
    - Request Body :
      - id :integer
    - Response (JSON) :
      - 200
      ```
      message : "Success"
      data : {Transactions}
      ```
      - 500
      ```
      message : error message
      ```
16. Post Konfirmasi Penerimaan
    - Method : POST
    - Link : /umkm/konfirmasi-penerimaan
    - (Required) header : Authorization : bearer token
    - Request Body :
      - id :integer
    - Response (JSON) :
      - 200
      ```
      message : "Success"
      data : {Transactions}
      ```
      - 500
      ```
      message : error message
      ```

## Outlet

1. Get Homepage

   - Method : GET
   - Link : /outlet/
   - (Required) header : Authorization : bearer token
   - Response (JSON) :
     - 200
     ```
     message : "Success"
     data : {totalStok, riwayatTransaksi}
     ```
     - 500
     ```
     message: error message
     ```

2. Get Laporan Penjualan

   - Method : GET
   - Link : /outlet/laporan/penjualan
   - (Required) header : Authorization : bearer token
   - Response (JSON) :
     - 200
     ```
     message : "Success"
     data : dataPenjualan
     ```
     - 500
     ```
     message: error message
     ```

3. Get Laporan Pembelian

   - Method : GET
   - Link : /outlet/laporan/pembelian
   - (Required) header : Authorization : bearer token
   - Response (JSON) :
     - 200
     ```
     message : "Success"
     data : dataPembelian
     ```
     - 500
     ```
     message: error message
     ```

4. Get Lihat Stok

   - Method : GET
   - Link : /outlet/lihat-stok
   - (Required) header : Authorization : bearer token
   - Response (JSON) :
     - 200
     ```
     message : "Success"
     data : Stocks
     ```
     - 500
     ```
     message : error message
     ```

5. Get Riwayat Transaksi

   - Method : GET
   - Link : /outlet/riwayat-transaksi
   - (Required) header : Authorization : bearer token
   - Response (JSON) :
     - 200
     ```
     message : "Success"
     data : Transaksi
     ```
     - 500
     ```
     message : error message
     ```

6. Get Beli Produk

   - Method : GET
   - Link : /outlet/beli-produk
   - (Required) header : Authorization : bearer token
   - Response (JSON) :
     - 200
     ```
     message : "Success"
     data : {FactoryStocks}
     ```
     - 500
     ```
     message : error message
     ```

7. Get Detail Toko
   - Method : GET
   - Link : /outlet/detail-toko/:idToko
   - Required params : idToko - integer
   - (Required) header : Authorization : bearer token
   - Response (JSON) :
     - 200
     ```
     message : "Success"
     data : {Users, Stocks}
     ```
     - 500
     ```
     message : error message
     ```
8. Post Pesan Bahan
   - Method : POST
   - Link : /outlet/beli-produk
   - (Required) header : Authorization : bearer token
   - Request Body :
     - from : integer
     - total : integer
     - items : Object
   - Response (JSON) :
     - 200
     ```
     message : "Success"
     data : {Transactions}
     ```
     - 500
     ```
     message : error message
     ```
9. Post Bayar Transaksi
   - Method : POST
   - Link : /umkm/bayar-transaksi
   - (Required) header : Authorization : bearer token
   - Request Body :
     - id : integer
     - file : file
   - Response (JSON) :
     - 200
     ```
     message : "Success"
     data : {Transactions}
     ```
     - 500
     ```
     message : error message
     ```
10. Post Konfirmasi Penerimaan
    - Method : POST
    - Link : /outlet/konfirmasi-penerimaan
    - (Required) header : Authorization : bearer token
    - Request Body :
      - id :integer
    - Response (JSON) :
      - 200
      ```
      message : "Success"
      data : {Transactions}
      ```
      - 500
      ```
      message : error message
      ```
11. Get Kasir Page

    - Method : GET
    - Link : /outlet/kasir
    - (Required) header : Authorization : bearer token
    - Response (JSON) :
      - 200
      ```
      message : "Success"
      data : {Cashiers}
      ```
      - 500
      ```
      message : error message
      ```

12. Post Tambah Kasir
    - Method : GET
    - Link : /outlet/kasir
    - (Required) header : Authorization : bearer token
    - Request Body :
      - username : String
      - password : String
      - fullName : String
    - Response (JSON) :
      - 200
      ```
      message : "Success"
      data : {Cashiers}
      ```
      - 500
      ```
      message : error message
      ```

## Kasir

1. Get Transaksi Page & Daftar Barang
   - Method : GET
   - Link : /kasir
   - (Required) header : Authorization : bearer token
   - Response (JSON) :
     - 200
     ```
     message : "Success"
     data : {OutletStocks}
     ```
     - 500
     ```
     message : error message
     ```
2. Post Transaksi
   - Method : POST
   - Link : /kasir
   - (Required) header : Authorization : bearer token
   - Request Body :
     - total : integer
     - items : Object
   - Response (JSON) :
     - 200
     ```
     message : "Success"
     data : {Cashiers}
     ```
     - 500
     ```
     message : error message
     ```
3. Post Login
   - Method : POST
   - Link : /kasir/login
   - (Required) header : Authorization : bearer token
   - Request Body :
     - username : string
     - password : string
   - Response (JSON) :
     - 200
     ```
     message : "Success"
     token : token
     ```
     - 500
     ```
     message : error message
     ```

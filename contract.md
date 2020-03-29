#API Contract

##Authorization

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
     data : user.data
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
   - Response Body : (Required) `user: User Data`
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
   - Link : /petani/laporan/penjualan
   - Response Body : (Required) `user: User Data`
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
   - Response Body : (Required) `user: User Data`
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
   - Link : /petani
   - Response Body : (Required) `user: User Data`
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
   - Link : /lihat-stok
   - Response Body : (Required) `user : User Data`
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
   - Link : /riwayat-transaksi
   - Response Body : (Required) `user : User Data`
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

## Pemasok Bahan Tambah

1. Get Homepage

   - Method : GET
   - Link : /bahan-tambah/
   - Response Body : (Required) `user: User Data`
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
   - Link : /bahan-tambah/laporan/penjualan
   - Response Body : (Required) `user: User Data`
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
   - Link : /bahan-tambah/laporan/pembelian
   - Response Body : (Required) `user: User Data`
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
   - Link : /bahan-tambah
   - Response Body : (Required) `user: User Data`
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
   - Link : /lihat-stok
   - Response Body : (Required) `user : User Data`
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
   - Link : /riwayat-transaksi
   - Response Body : (Required) `user : User Data`
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

## Pemasok Kemasan

1. Get Homepage

   - Method : GET
   - Link : /kemasan/
   - Response Body : (Required) `user: User Data`
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
   - Response Body : (Required) `user: User Data`
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
   - Response Body : (Required) `user: User Data`
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
   - Link : /kemasan
   - Response Body : (Required) `user: User Data`
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
   - Link : /lihat-stok
   - Response Body : (Required) `user : User Data`
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
   - Link : /riwayat-transaksi
   - Response Body : (Required) `user : User Data`
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

## UMKM

1. Get Homepage

   - Method : GET
   - Link : /ukm/
   - Response Body : (Required) `user: User Data`
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
   - Link : /ukm/laporan/penjualan
   - Response Body : (Required) `user: User Data`
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
   - Link : /ukm/laporan/pembelian
   - Response Body : (Required) `user: User Data`
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
   - Link : /ukm/laporan/produksi
   - Response Body : (Required) `user: User Data`
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
   - Link : /ukm
   - Response Body : (Required) `user: User Data`
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

6. Get Lihat Stok

   - Method : GET
   - Link : /lihat-stok/bahan
   - Response Body : (Required) `user : User Data`
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

7. Get Lihat Stok

   - Method : GET
   - Link : /lihat-stok/produk
   - Response Body : (Required) `user : User Data`
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
   - Link : /riwayat-transaksi
   - Response Body : (Required) `user : User Data`
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

## Outlet

1. Get Homepage

   - Method : GET
   - Link : /outlet/
   - Response Body : (Required) `user: User Data`
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
   - Response Body : (Required) `user: User Data`
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
   - Response Body : (Required) `user: User Data`
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
   - Link : /lihat-stok
   - Response Body : (Required) `user : User Data`
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
   - Link : /riwayat-transaksi
   - Response Body : (Required) `user : User Data`
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

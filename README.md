# GuestRegister

- Clone project
- Jalankan npm install
- Jalankan "npm start"

1. POST   : /guest/  --> untuk registrasi guest
   Respon : Success = 201
            IDCardNo sudah terdaftar = "Guest already registered"
            IDCardNo atau phone bukan angka = "ID Card or Phone is not valid"

   Validasi : - IDCardNo, phone harus angka 
              - IDCardNo harus unik, tidak boleh lebih dari sekali didaftarkan

   Request JSON    : {
                        "name": "Jessica",
                        "idCardNo": "123424",
                        "phone": "01233445" 
                     }

2. GET  : /guest/idCardNo ---> untuk melihat single data
   Request example : /guest/123424
   Respon JSON    : {
			                  "name": "Jessica",
                        "idCardNo": "123424",
                        "phone": "01233445",
                        "address": "-"
		                }

3. PUT  : /guest/idCardNo ---> untuk update data guest
   Respon : Success = 200
	          Mengubah IDCardNo = "ID Card Number can not be changed"
   Validasi : hanya dapat mengubah name, phone, address, IDCard tidak dapat diubah
   Request  JSON    : {
                          "name" : "Della",	
			                    "address" : "Malang"
		                  }

6. GET : /guest/page/limit--> melihat data guest
   Request example : /guest/1/10
   Respon : {
		            "totalData": 1,
                "page": 1,
                "totalPage": 1,
                "data": [
                          {
                              "_id": "5c6d15645db0e61a9c12c5d0",
                              "name": "Della",
                              "idCardNo": "123424",
                              "phone": "01233445",
                              "__v": 0,
                              "address": "Malang"
                          }
                        ]
            }

7. DEL : /guest/idCardNo
   Respon : 204
   

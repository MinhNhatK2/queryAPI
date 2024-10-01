# Quiz API

API này được xây dựng để truy vấn danh sách câu hỏi và đáp án từ cơ sở dữ liệu MySQL Cloud Clever và deploy trên Vercel. API trả về các câu hỏi và đáp án dưới dạng JSON, phục vụ cho một ứng dụng thi trắc nghiệm online.

## Mục lục

- [Cài đặt](#cài-đặt)
- [Cấu hình cơ sở dữ liệu MySQL trên Cloud Clever](#cấu-hình-cơ-sở-dữ-liệu-mysql-trên-cloud-clever)
- [API Endpoints](#api-endpoints)
- [Deploy trên Vercel](#deploy-trên-vercel)
- [Sử dụng](#sử-dụng)

## Cài đặt

1. Clone dự án về máy:

   ```bash
   git clone https://github.com/MinhNhatK2/queryAPI.git
   cd queryAPI

   ```

2. Cài đặt các dependencies:

   ```bash
   npm install

   ```

3. Tạo file .env trong thư mục gốc dự án và thêm các thông tin về kết nối cơ sở dữ liệu MySQL:

   ```bash
   DB_HOST=<MYSQL_HOST>
   DB_USER=<MYSQL_USER>
   DB_PASSWORD=<MYSQL_PASSWORD>
   DB_DATABASE=<MYSQL_DATABASE>
   ```

## Cấu hình cơ sở dữ liệu MySQL trên Cloud Clever

1. Đăng nhập vào Clever Cloud.
2. Tạo một ứng dụng MySQL và sao chép thông tin kết nối (host, user, password, database).
3. Cập nhật thông tin vào file .env như hướng dẫn ở trên.

## API Endpoints

1. Lấy danh sách câu hỏi và đáp án cho bài thi

   ````http
   GET/X_api

   Response:
   ```json
           {
       "exam_id": 1,
       "questions": [
           {
           "question_id": 1,
           "question_text": "Câu hỏi 1 là gì?",
           "answers": [
               { "answer_id": 1, "answer_text": "Đáp án A", "is_correct": false },
               { "answer_id": 2, "answer_text": "Đáp án B", "is_correct": true }
           ]
           },
           {
           "question_id": 2,
           "question_text": "Câu hỏi 2 là gì?",
           "answers": [
               { "answer_id": 3, "answer_text": "Đáp án A", "is_correct": true },
               { "answer_id": 4, "answer_text": "Đáp án B", "is_correct": false }
           ]
           }
       ]
   }
   ````

## Deploy lên Vercel

Bước 1: Đăng ký tài khoản Vercel
Truy cập Vercel và đăng ký tài khoản.
Bước 2: Deploy ứng dụng 1. Kết nối repository từ GitHub (hoặc một dịch vụ Git khác) với Vercel. 2. Cấu hình biến môi trường trên Vercel:

        - Truy cập vào phần Settings của dự án trên Vercel.
        - Thêm các biến môi trường giống như trong file .env ở mục Environment Variables.
    3. Chạy lệnh deploy trực tiếp từ Vercel Dashboard hoặc dùng lệnh CLI:
            ```bash
            vercel

Bước 3: Hoàn thành
Sau khi deploy thành công, bạn sẽ nhận được URL như https://your-project.vercel.app/X_api

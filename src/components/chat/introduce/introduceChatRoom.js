import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
export default function IntroduceChatRoom() {
  var data = [
    {
      id: 0,
      title: "Nhắn tin nhiều hơn, soạn thảo ít hơn",
      subTitle:
        "Sử dụng Tin Nhắn Nhanh để lưu sẵn các tin nhắn thường dùng và gửi nhanh trong hội thoại bất kỳ.",
      image: require("./assets/1.png"),
    },

    {
      id: 1,
      title: "Tin nhắn tự xoá",
      subTitle:
        "Từ giờ tin nhắn đã có thể tự động tự xóa sau khoảng thời gian nhất định.",
      image: require("./assets/2.png"),
    },
    {
      id: 2,
      title: "Mã hoá đầu cuối",
      subTitle:
        "Nội dung tin nhắn được mã hóa trong suốt quá trình gửi và nhận.",
      image: require("./assets/3.jpg"),
    },
    {
      id: 3,
      title: "Gọi nhóm và làm việc hiệu quả với Zalo Group Call",
      subTitle: "Trao đổi công việc mọi lúc mọi nơi.",
      image: require("./assets/4.jpg"),
    },
    {
      id: 4,
      title: "Trải nghiệm xuyên suốt",
      subTitle:
        "Kết nối và giải quyết công việc trên mọi thiết bị với dữ liệu luôn được đồng bộ.",
      image: require("./assets/5.jpg"),
    },
    {
      id: 5,
      title: "Gửi File nặng?",
      subTitle: 'Đã có Zalo PC "xử" hết.',
      image: require("./assets/6.png"),
    },
    {
      id: 6,
      title: "Chat nhóm với đồng nghiệp",
      subTitle: "Tiện lợi hơn, nhờ các công cụ hỗ trợ chat trên máy tính.",
      image: require("./assets/7.jpg"),
    },
    {
      id: 7,
      title: "Giải quyết công việc hiệu quả hơn, lên đến 40%",
      subTitle: "Với Zalo PC.",
      image: require("./assets/8.jpg"),
    },
  ];

  return (
    <div className="h-full w-10/12 flex flex-row justify-center items-center ">
      <div className="w-full  flex flex-col justify-center items-center">
        <div className=" flex flex-col justify-center items-center my-10">
          <p className="text-2xl my-7 flex flex-row justify-center items-center">
            Chào mừng đến với <p className="font-bold mx-1"> Zalo PC</p>
          </p>
          <span className="w-[500px] text-sm text-center">
            Khám phá những tiện ích hỗ trợ làm việc và trò chuyện cùng người
            thân, bạn bè được tối ưu hoá cho máy tính của bạn.
          </span>
        </div>

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper w-[1400px]"
        >
          {data.map((item) => (
            <SwiperSlide>
              <div className="flex flex-col justify-center items-center">
                <img className="h-60" src={item.image} alt="#" />
                <div className="my-10">
                  <p className="text-center font-medium text-xl text-[#005ae0]">
                    {item.title}
                  </p>
                  <p className="text-sm text-center">{item.subTitle}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

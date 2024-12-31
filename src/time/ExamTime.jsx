import React, { useState, useEffect } from "react";
import './ExamTime.scss';
const ExamTime = ({dueDate}) => {
    const [timeLeft, setTimeLeft] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Hàm tính toán thời gian còn lại
    const calculateTimeLeft = (endTime) => {
        const difference = +new Date(endTime) - +new Date();
        if (difference > 0) {
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            return null;
        }
    };

    // Gọi API hoặc dùng endTime tĩnh
    useEffect(() => {
        const fetchExamTime = async () => {
            try {
                // Giả sử bạn có API trả về thời gian làm bài kiểm tra
                // const response = { endTime: "2024-12-27T2:20:00Z" }; // Dữ liệu giả lập
                const endTime  = dueDate;

                setTimeLeft(calculateTimeLeft(endTime));
                setIsLoading(false);

                // Cập nhật đếm ngược mỗi giây
                const timer = setInterval(() => {
                    const updatedTimeLeft = calculateTimeLeft(endTime);
                    if (updatedTimeLeft) {
                        setTimeLeft(updatedTimeLeft);
                    } else {
                        clearInterval(timer); // Ngừng đếm ngược khi hết giờ
                        setTimeLeft(null);
                    }
                }, 1000);

                return () => clearInterval(timer);
            } catch (error) {
                setError("Error fetching exam time");
                setIsLoading(false);
            }
        };

        fetchExamTime();
    }, []);

    // Hiển thị trạng thái đang tải
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Hiển thị lỗi nếu xảy ra
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Hiển thị thông báo hết giờ
    if (!timeLeft) {
        return <div className="time-up">Time's up!</div>;
    };

    // Hiển thị thời gian đếm ngược
    return (
        <div className="countdown-container">
            <div className="time-left">
                {/*{timeLeft.days !== undefined && (*/}
                {/*    <div className="time-box">*/}
                {/*        {timeLeft.days}*/}
                {/*        <span className="time-label">Days</span>*/}
                {/*    </div>*/}
                {/*)}*/}
                {timeLeft.hours !== undefined && (
                    <div className="time-box">
                        {timeLeft.hours}
                        <span className="time-label">Hours</span>
                    </div>
                )}
                {timeLeft.minutes !== undefined && (
                    <div className="time-box">
                        {timeLeft.minutes}
                        <span className="time-label">Minutes</span>
                    </div>
                )}
                {timeLeft.seconds !== undefined && (
                    <div className="time-box">
                        {timeLeft.seconds}
                        <span className="time-label">Seconds</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExamTime;
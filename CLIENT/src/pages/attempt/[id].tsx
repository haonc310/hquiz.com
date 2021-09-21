import { useEffect, useState } from 'react';
import LayoutAttempt from '../../components/common/LayoutAttempt';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

import data from '../../data/question.json';
import { useRouter } from 'next/dist/client/router';

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 10,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 10,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 786,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
  ],
};

const Attempt: any = () => {
  const router = useRouter();

  const [questionIndex, setQuestionIndex] = useState(1);
  const [answers, setAnswers] = useState(Array.from(Array(data.questions.length)).fill(0));
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);

  const formatTime = (time: number) => {
    return time < 10 ? '0' + time : time;
  };
  useEffect(() => {
    if (seconds === 0 && minutes === 0) return;

    const timer = setTimeout(() => {
      setSeconds(seconds - 1);

      if (seconds === 0 && minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const checkAnswer = (index: number): boolean => {
    if (!answers[index]) return false;
    return true;
  };

  const handleAnswer = (index: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex - 1] = index;
    setAnswers(newAnswers);
  };

  const selectQuestion = (index: number) => {
    setQuestionIndex(index);
  };

  return (
    <div className="attempt">
      <div className="container-fluid">
        <div className="attempt-heading">
          <span>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"></path>
            </svg>
          </span>
          <span>Trang chủ</span>
        </div>
        <div className="row-reverse ">
          <div className="col-xl-9 col-lg-8">
            <div className="attempt-question">
              <span className="attempt-title">{data.questions[questionIndex - 1].title}</span>
              <div className="attempt-answer">
                <form name={`question_${questionIndex}`}>
                  {data.questions[questionIndex - 1].answers.map((item, index) => {
                    return (
                      <div key={item._id}>
                        <input
                          type="radio"
                          id={`answer_${index}`}
                          name={`answer_${questionIndex}`}
                          onChange={() => handleAnswer(index + 1)}
                        />
                        <label htmlFor={`answer_${index}`}>{item.value}</label>
                      </div>
                    );
                  })}
                </form>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 ">
            <div className="attempt-info">
              <div className="attempt-info-name">
                <span># Đề thi</span>
                <span>Trường THPT Phan Châu Trinh lần 3</span>
              </div>
              <div className="attempt-time">
                <div>
                  <span>
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13 6H11V7C11 7.55228 11.4477 8 12 8C12.5523 8 13 7.55228 13 7V6Z"
                        fill="currentColor"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6 2V4H7V7C7 9.76142 9.23858 12 12 12C9.23858 12 7 14.2386 7 17V20H6V22H18V20H17V17C17 14.2386 14.7614 12 12 12C14.7614 12 17 9.76142 17 7V4H18V2H6ZM9 4H15V7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7V4ZM9 17V20H15V17C15 15.3431 13.6569 14 12 14C10.3431 14 9 15.3431 9 17Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                  <span>Thời gian làm bài</span>
                </div>
                <div className="attempt-cricle">
                  <div className="attempt-cricle-text">
                    <div>
                      <span>{formatTime(minutes)}</span>
                    </div>
                    <div>
                      <span>:</span>
                    </div>
                    <div>
                      <span>{formatTime(seconds)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="attempt-map">
                <div className="attempt-map-text">
                  <span># Sơ đồ thi</span>
                  <div>
                    <span>0</span>
                    <span>/</span>
                    <span>{data.questions.length}</span>
                  </div>
                </div>
                <div className="attempt-map-picture">
                  {Array.from(Array(data.questions.length).keys()).map((item, index) => {
                    let className = '';
                    if (index + 1 === questionIndex) {
                      className += ' active';
                    }
                    if (checkAnswer(index)) {
                      className += ' math';
                    }
                    return (
                      <div
                        className={className}
                        onClick={() => selectQuestion(index + 1)}
                        key={index}
                      ></div>
                    );
                  })}
                </div>
              </div>
              <div className="attempt-button">
                <button>Kết thúc bài thi</button>
              </div>
              <div className="attempt-question-mobile">
                <Slider {...settings}>
                  {Array.from(Array(data.questions.length).keys()).map((item, index) => {
                    let className = '';
                    if (item + 1 === questionIndex) className += 'active';
                    return (
                      <div
                        className={className}
                        onClick={() => selectQuestion(item + 1)}
                        key={index}
                      >
                        Câu {item + 1}
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Attempt.Layout = LayoutAttempt;

export default Attempt;

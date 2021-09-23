import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Sidebar from '../../components/topic/Sidebar';
import TopicItem from '../../components/topic/TopicItem';
import data from '../../data/topic.json';
import Head from 'next/head';

const Topic: NextPage = () => {
  const [isActive, setIsActive] = useState(true);
  const router = useRouter();
  const page = Number(router.query.page) || 1;

  useEffect(() => {
    const width = window.innerWidth;
    if (width < 1024) {
      setIsActive(false);
    }
    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      if (width < 1024 && isActive) {
        setIsActive(false);
      }
    });
  }, []);
  return (
    <>
      <Head>
        <title>Bộ đề thi trắc nghiệm THPT Quốc Gia mới nhất</title>
      </Head>
      <div className="topic">
        <div className={isActive ? 'sidebar active' : 'sidebar'}>
          <Sidebar />
        </div>
        <div
          className={isActive ? 'modal active' : 'modal'}
          onClick={() => setIsActive(false)}
        ></div>

        <div className="topic-wrap">
          <div className="topic-content">
            <div className="topic-heading">
              <ul className="topic-break">
                <li>
                  <Link href="/">HQUIZ</Link>
                </li>
                <li className="arrow">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.072 8.024L5.715 3.667l.618-.62L11 7.716v.618L6.333 13l-.618-.619 4.357-4.357z"
                    ></path>
                  </svg>
                </li>
                <li>
                  <Link href="/de-thi">Đề thi</Link>
                </li>
              </ul>
              <div className="topic-toggle">
                <button onClick={() => setIsActive(!isActive)}>Bộ lọc</button>
              </div>
            </div>
            <div className="topic-list">
              <div className="row">
                {data.topic.map((item, index) => {
                  return (
                    <div className="col-xl-6" key={index}>
                      <TopicItem topic={item} />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="topic-pagination">
              <ul className="pagination-list">
                {[1, 2].map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={item === page ? 'pagination-item active' : 'pagination-item'}
                    >
                      <Link href={`/de-thi/?page=${item}`}>
                        <a>{item}</a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className={isActive ? 'topic-left active' : 'topic-left'}></div>
      </div>
    </>
  );
};

export default Topic;

import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-branch-container">
      <div className="find-suitable-job-for-you">
        <h1 className="home-header">Find The Job That Fits Your Life</h1>
        <p className="home-description">
          Millions of people are searching for jobs, salary information, Company
          reviews. Find the job that fit your abilities and potential.
        </p>
        <Link to="/jobs">
          <button className="home-btn" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default Home

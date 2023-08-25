import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobsCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="joab-card-link">
      <li className="job-card-container">
        <div className="job-card-company-logo-location-package-container">
          <img
            className="job-card-company-logo"
            src={companyLogoUrl}
            alt="company logo"
          />
          <div className="title-rating-container">
            <h1 className="job-card-title">{title}</h1>
            <div className="icon-rating-card">
              <AiFillStar className="fill-star-icon" />
              <p className="job-card-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="bob-card-icons-location-emp-type-package-container">
          <div className="icons-location-emp-type-cards-container">
            <div className="icon-location-card">
              <MdLocationOn className="job-card-icons" />
              <p className="job-card-loc">{location}</p>
            </div>
            <div className="icon-emp-type-card">
              <BsBriefcaseFill className="job-card-icons" />
              <p className="job-card-loc">{employmentType}</p>
            </div>
          </div>
          <p className="job-card-package">{packagePerAnnum}</p>
        </div>
        <hr className="job-card-line" />
        <div>
          <h1 className="job-card-description">Description</h1>
          <p className="job-card-job-description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobsCard

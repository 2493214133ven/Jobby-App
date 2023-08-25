import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobs = props => {
  const {similar} = props
  const {
    title,
    companyLogoUrl,
    location,
    employmentType,
    jobDescription,
    rating,
  } = similar
  return (
    <li className="similar-jobs-details-container">
      <div className="similar-jobs-logo-title-rating-card-container">
        <img
          className="similar-job-company-logo"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div className="similar-job-title-rating-star-cards">
          <h1 className="similar-jobs-names">{title}</h1>

          <div className="similar-job-rating-star-card">
            <AiFillStar className="similar-jobs-rating-stars" />
            <p className="similar-jobs-ratings">{rating}</p>
          </div>
        </div>
      </div>
      <div className="similar-jobs-desc-loc-emp-ty-cards-container">
        <h1 className="description-titles">Description</h1>
        <p className="similar-job-description">{jobDescription}</p>
        <div className="similar-jobs-location-and-emp-type-container">
          <div className="similar-jobs-location-card">
            <MdLocationOn className="similar-locator" />
            <p className="similar-loc">{location}</p>
          </div>
          <div className="similar-jobs-location-card">
            <BsBriefcaseFill className="similar-cases" />
            <p className="similar-emp-ty">{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs

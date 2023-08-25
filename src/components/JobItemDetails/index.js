import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {RiShareBoxFill} from 'react-icons/ri'
import {Component} from 'react'
import SimilarJobs from '../SimilarJobs'
import Header from '../Header'
import './index.css'

const apiCommandingStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'INPROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobItemDetails: [],
    similarJobList: [],
    apiJobStatus: apiCommandingStatus.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiJobStatus: apiCommandingStatus.in_progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, option)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updateData = [data.job_details].map(jobDetails => ({
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        lifeAtCompany: {
          description: jobDetails.life_at_company.description,
          imageUrl: jobDetails.life_at_company.image_url,
        },
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,

        skills: jobDetails.skills.map(each => ({
          name: each.name,
          imageUrl: each.image_url,
        })),
        title: jobDetails.title,
      }))
      const similarJobs = data.similar_jobs.map(each => ({
        id: each.id,
        title: each.title,
        companyLogoUrl: each.company_logo_url,
        location: each.location,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        rating: each.rating,
      }))
      this.setState({
        jobItemDetails: updateData,
        similarJobList: similarJobs,
        apiJobStatus: apiCommandingStatus.success,
      })
    } else {
      this.setState({apiJobStatus: apiCommandingStatus.failure})
    }
  }

  renderJobItemDetailsAndSimilarJobList = () => {
    const {jobItemDetails, similarJobList} = this.state
    if (jobItemDetails.length >= 1) {
      const {
        title,
        companyLogoUrl,
        companyWebsiteUrl,
        rating,
        location,
        packagePerAnnum,
        jobDescription,
        skills,
        lifeAtCompany,
        employmentType,
      } = jobItemDetails[0]
      console.log(jobDescription[0])

      return (
        <div className="job-items-and-similar-list-card-container">
          <div className="job-item-details-card-container">
            <div className="job-item-company-logo-title-star-rating-card-container">
              <img
                className="job-item-company-logo"
                src={companyLogoUrl}
                alt="job details company logo"
              />
              <div className="job-item-title-rating-container">
                <h1 className="job-item-title">{title}</h1>
                <div className="job-item-icon-rating-card">
                  <AiFillStar className="job-item-fill-star-icon" />
                  <p className="job-item-rating">{rating}</p>
                </div>
              </div>
            </div>
            <div className="job-item-icons-loc-pkg-empTy-container">
              <div className="job-item-icon-loc-empTy-container">
                <div className="job-item-loc-icon-card">
                  <MdLocationOn className="job-item-react-location-icon" />
                  <p className="job-item-location">{location}</p>
                </div>
                <div className="job-item-emp-type-icon-card">
                  <BsBriefcaseFill className="job-item-react-job-icon" />
                  <p className="job-item-location">{employmentType}</p>
                </div>
              </div>
              <div>
                <p className="job-item-package">{packagePerAnnum}</p>
              </div>
            </div>
            <hr className="job-item-line" />
            <div className="job-item-description-anchor-ele-share-icon-container">
              <div className="job-item-anchor-and-description-container">
                <h1 className="job-item-description-title">Description</h1>
                <a className="anchor-ele" href={companyWebsiteUrl}>
                  Visit <RiShareBoxFill className="share-icon" />
                </a>
              </div>
              <p className="job-item-descriptions">{jobDescription}</p>
            </div>
            <div className="job-item-skill-cards-container">
              <h1 className="skills-header">Skills</h1>
              <ul className="job-item-skills-list-container">
                {skills.map(each => (
                  <li className="skills-sets" key={each.name}>
                    <img
                      className="skills-image"
                      src={each.imageUrl}
                      alt={each.name}
                    />
                    <p className="skills-name">{each.name}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="job-item-life-at-company-container">
              <h1 className="life-at-company-title">Life at Company</h1>
              <div className="life-at-company-des-image-cards">
                <p className="life-at-company-description">
                  {lifeAtCompany.description}
                </p>
                <img
                  className="life-at-company-image"
                  src={lifeAtCompany.imageUrl}
                  alt="life at company"
                />
              </div>
            </div>
          </div>
          <div className="job-item-similar-job-container">
            <h1 className="similar-jobs-header">Similar Jobs</h1>
            <ul className="similar-items-card-list-container">
              {similarJobList.map(eachJob => (
                <SimilarJobs key={eachJob.id} similar={eachJob} />
              ))}
            </ul>
          </div>
        </div>
      )
    }
    return null
  }

  retryJobItemDetails = () => {
    this.getJobItemDetails()
  }

  renderApiRJobFailure = () => (
    <div className="failure-api-failure-container">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-header">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        onClick={this.retryJobItemDetails}
        className="failure-btn"
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderApiConstantsThroughJobs = () => {
    const {apiJobStatus} = this.state

    switch (apiJobStatus) {
      case apiCommandingStatus.success:
        return this.renderJobItemDetailsAndSimilarJobList()
      case apiCommandingStatus.failure:
        return this.renderApiRJobFailure()
      case apiCommandingStatus.in_progress:
        return this.renderLoading()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-details-item-container">
          {this.renderApiConstantsThroughJobs()}
        </div>
      </>
    )
  }
}

export default JobItemDetails

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BiSearch} from 'react-icons/bi'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import {Component} from 'react'
import Header from '../Header'
import JobsCard from '../JobsCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiCommandingStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'INPROGRESS',
}

class Job extends Component {
  state = {
    jobsList: [],
    profileData: {},
    checkBoxActiveList: [],
    salaryRangeSelection: '',
    searchInput: '',
    apiJobStatus: apiCommandingStatus.initial,
    apiProfileStatus: apiCommandingStatus.initial,
  }

  componentDidMount() {
    this.getJobList()
    this.getProfileData()
  }

  getProfileData = async () => {
    this.setState({apiProfileStatus: apiCommandingStatus.in_progress})
    const apiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const profile = data.profile_details
      const updateData = {
        name: profile.name,
        profileImageUrl: profile.profile_image_url,
        shortBio: profile.short_bio,
      }
      this.setState({
        profileData: updateData,
        apiProfileStatus: apiCommandingStatus.success,
      })
    } else {
      this.setState({apiProfileStatus: apiCommandingStatus.failure})
    }
  }

  getJobList = async () => {
    this.setState({apiJobStatus: apiCommandingStatus.in_progress})
    const {checkBoxActiveList, salaryRangeSelection, searchInput} = this.state
    const add = checkBoxActiveList.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${add}&minimum_package=${salaryRangeSelection}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, option)
    if (response.ok === true) {
      const data = await response.json()
      const UpdateData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: UpdateData,
        apiJobStatus: apiCommandingStatus.success,
      })
    } else {
      this.setState({apiJobStatus: apiCommandingStatus.failure})
    }
  }

  onClickCheckBox = event => {
    const {checkBoxActiveList} = this.state

    console.log(checkBoxActiveList)
    if (checkBoxActiveList.includes(event.target.id)) {
      const newList = checkBoxActiveList.filter(
        each => each !== event.target.id,
      )
      this.setState({checkBoxActiveList: newList}, this.getJobList)
    } else {
      this.setState(
        prevData => ({
          checkBoxActiveList: [...prevData.checkBoxActiveList, event.target.id],
        }),
        this.getJobList,
      )
    }
  }

  onChangeRadio = e => {
    this.setState({salaryRangeSelection: e.target.id}, this.getJobList)
  }

  onSearchInputValue = e => {
    this.setState({searchInput: e.target.value})
  }

  onSubmitValue = () => {
    this.getJobList()
  }

  onEnterSearchInput = e => {
    if (e.key === 'Enter') {
      this.getJobList()
    }
  }

  renderSmSearchBer = () => {
    const {searchInput} = this.state
    return (
      <div className="job-Small-search-card-container">
        <input
          onChange={this.onSearchInputValue}
          value={searchInput}
          className="input-search"
          placeholder="Search"
          type="search"
          onKeyDown={this.onEnterSearchInput}
        />
        <div className="react-bi-icon-container">
          <button
            data-testid="searchButton"
            className="icon-search-btn"
            type="button"
            onClick={this.onSubmitValue}
          >
            <BiSearch className="bi-icon-search" />
          </button>
        </div>
      </div>
    )
  }

  renderLgSearchBer = () => {
    const {searchInput} = this.state
    return (
      <div className="job-search-card-container">
        <input
          onChange={this.onSearchInputValue}
          value={searchInput}
          className="input-search"
          placeholder="Search"
          type="search"
          onKeyDown={this.onEnterSearchInput}
        />
        <div className="react-bi-icon-container">
          <button
            data-testid="searchButton"
            className="icon-search-btn"
            type="button"
            onClick={this.onSubmitValue}
          >
            <BiSearch className="bi-icon-search" />
          </button>
        </div>
      </div>
    )
  }

  renderProfileDetails = () => {
    const {profileData} = this.state
    const {profileImageUrl, name, shortBio} = profileData

    return (
      <>
        {this.renderSmSearchBer()}
        <div className="job-profile-details-card-container">
          <img src={profileImageUrl} className="profile-image" alt="profile" />
          <h1 className="profile-name">{name}</h1>
          <p className="profile-short-bio">{shortBio}</p>
        </div>
        <hr className="job-line" />
      </>
    )
  }

  renderCheckBoxDetails = () => (
    <>
      <div className="check-box-emp-type-container">
        <h1 className="check-box-header">Type of Employment</h1>
        <ul className="check-box-cards">
          {employmentTypesList.map(eachType => (
            <li
              key={eachType.employmentTypeId}
              className="check-boxes-label-container"
            >
              <input
                className="input-check-box"
                id={eachType.employmentTypeId}
                type="checkbox"
                onChange={this.onClickCheckBox}
              />
              <label className="label-ele" htmlFor={eachType.employmentTypeId}>
                {eachType.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <hr className="job-line" />
    </>
  )

  renderSalaryStatus = () => (
    <>
      <div className="check-box-emp-type-container">
        <h1 className="check-box-header">Salary Range</h1>
        <ul className="check-box-cards">
          {salaryRangesList.map(eachType => (
            <li
              key={eachType.salaryRangeId}
              className="check-boxes-label-container"
            >
              <input
                name="id"
                className="input-check-box"
                id={eachType.salaryRangeId}
                onChange={this.onChangeRadio}
                type="radio"
              />
              <label className="label-ele" htmlFor={eachType.salaryRangeId}>
                {eachType.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <hr className="job-line" />
    </>
  )

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsList = () => {
    const {jobsList} = this.state
    const lengthOfJobList = jobsList.length > 0

    return lengthOfJobList ? (
      <>
        <ul className="job-list-ordering-cards-container">
          {jobsList.map(eachJob => (
            <JobsCard key={eachJob.id} jobDetails={eachJob} />
          ))}
        </ul>
      </>
    ) : (
      <div className="no-jobs-contain-container">
        <img
          className="no-jobs-image"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1 className="no-job-header">No Jobs Found</h1>
        <p className="no-job-description">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
  }

  retryJobData = () => {
    this.getJobList()
  }

  retryProfileData = () => {
    this.getProfileData()
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
        We cannot seem to find the page you are looking for.
      </p>
      <button onClick={this.retryJobData} className="failure-btn" type="button">
        Retry
      </button>
    </div>
  )

  renderProfileFailure = () => (
    <>
      <div className="failure-profile-failure-container">
        <button
          className="failure-btn"
          onClick={this.retryProfileData}
          type="button"
        >
          Retry
        </button>
      </div>
      <hr className="job-line" />
    </>
  )

  renderApiProfileStatus = () => {
    const {apiProfileStatus} = this.state

    switch (apiProfileStatus) {
      case apiCommandingStatus.success:
        return this.renderProfileDetails()
      case apiCommandingStatus.failure:
        return this.renderProfileFailure()
      case apiCommandingStatus.in_progress:
        return this.renderLoading()
      default:
        return null
    }
  }

  renderApiJobStatus = () => {
    const {apiJobStatus} = this.state

    switch (apiJobStatus) {
      case apiCommandingStatus.success:
        return this.renderJobsList()
      case apiCommandingStatus.failure:
        return this.renderApiRJobFailure()
      case apiCommandingStatus.in_progress:
        return this.renderLoading()

      default:
        return null
    }
  }

  renderSuccessJobCornerDetails = () => (
    <div className="job-container">
      <div className="profile-and-tyEmp-rngSalary-card-container">
        {this.renderApiProfileStatus()}
        {this.renderCheckBoxDetails()}
        {this.renderSalaryStatus()}
      </div>
      <div className="job-list-card-container">
        {this.renderLgSearchBer()}
        {this.renderApiJobStatus()}
      </div>
    </div>
  )

  render() {
    return (
      <>
        <Header />
        {this.renderSuccessJobCornerDetails()}
      </>
    )
  }
}

export default Job

import { Component } from 'react'
import PropTypes from 'prop-types'
import { AuthAPI } from './AuthAPI'
import { UserAPI } from './UserAPI'
import { OfficeAPI } from './OfficeAPI'
import { PositionAPI } from './PositionAPI'
import { EmployeeAPI } from './EmployeeAPI'
import { StatusAPI } from './StatusAPI'
import { TaskAPI } from './TaskAPI'
import { RoleAPI } from './RoleAPI'
import { MemberAPI } from './MemberAPI'

export default class Api extends Component {
  constructor (props) {
    super(props)

    window.AuthAPI = AuthAPI
    window.UserAPI = UserAPI
    window.OfficeAPI = OfficeAPI
    window.PositionAPI = PositionAPI
    window.EmployeeAPI = EmployeeAPI
    window.StatusAPI = StatusAPI
    window.TaskAPI = TaskAPI
    window.RoleAPI = RoleAPI
    window.MemberAPI = MemberAPI
  }

  render () {
    return this.props.children
  }
}

Api.propTypes = {
  children: PropTypes.node
}

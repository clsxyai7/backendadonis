import User from '#models/user'
import Comment from '#models/comment'
import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class CommentPolicy extends BasePolicy {
  
  view(user: User,comment:Comment): AuthorizerResponse {
    return user.role==='teacher' || user.role==='admin'
  }
  
  create(user: User, comment:Comment): AuthorizerResponse {
    return user.role==='teacher' || user.role==='admin'
  }
  
  update(user: User,comment:Comment): AuthorizerResponse {
    return user.role==='admin' || comment.teacher?.userId===user.id
  }
  
  delete(user: User, comment:Comment): AuthorizerResponse {
    return user.role==='admin' || comment.teacher?.userId===user.id
  }
  
}
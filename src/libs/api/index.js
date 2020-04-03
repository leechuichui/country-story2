import { fetchJSON } from "libs/fetch"
import { stringify } from "querystring"
import { dispatch } from "libs/store"
import {
  displayAPIWorkingOverlay,
  hideAPIWorkingOverlay,
} from "modules/ui/actions"

export function overlayControl(func) {
  return async (...params) => {
    dispatch(displayAPIWorkingOverlay())
    const result = await func(...params)
    dispatch(hideAPIWorkingOverlay())

    return result
  }
}
// base64 hash of `ams-workflows:ams-workflows`
export const BASIC_AUTH_HASH = "YW1zLXdvcmtmbG93czphbXMtd29ya2Zsb3dz"

export async function getReservesData(category) {
  return await fetchJSON(
    `/docs/api/v1/reserve/${category}/list/analytics?size=100000`,
  )
}

export async function getProductionData(category) {
  return await fetchJSON(
    `/docs/api/v1/production/list/${category}/analytics?size=10000000`,
    null,
    true,
  )
}

export async function login(username, password) {
  const body = stringify({
    grant_type: "password",
    username,
    password,
  })

  return await fetchJSON(
    `/uaa/oauth/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    },
    false,
  )
}

export async function refresh(token) {
  const body = stringify({
    grant_type: "refresh_token",
    refresh_token: token,
  })

  return await fetchJSON(
    "/uaa/oauth/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    },
    false,
  )
}

export async function revoke(token) {
  return await fetchJSON(
    "/uaa/oauth/revoke_token",
    {
      method: "POST",
    },
    false,
  )
}

export async function me() {
  return await fetchJSON("/uaa/me")
}

/**
 *  Add an user to discussion channel
 *
 * @param {String} fullName - User full name
 * @param {String} userName - User name
 * @param {String} channelId - Discussion channel Number
 */
export async function addMemberToChannelDiscussion(
  fullName,
  userName,
  channelId,
) {
  return await fetchJSON(
    `${PRODUCT_APP_URL_API}/mp/api/addMemberToChannelDiscussion`,
    {
      method: "POST",
      body: JSON.stringify({
        fullName,
        userName,
        channelId,
      }),
    },
  )
}
/**
 * Get all discussion channels
 * @param {String} token - User authorization token
 */
export async function discussionChannels() {
  return await fetchJSON(`${PRODUCT_APP_URL_API}/mp/api/discussionChannels`)
}

/**
 *
 * @param {String} messageId - Message's id
 * @param {String} token - User authorization token
 */
export async function readChannelMessage(messageId) {
  return await fetchJSON(`${PRODUCT_APP_URL_API}/mp/api/readChannelMessage`, {
    medthod: "POST",
    body: JSON.stringify({
      messageId,
    }),
  })
}

export async function sendChannelMessage(channelId, content) {
  return await fetchJSON(`${PRODUCT_APP_URL_API}/mp/api/sendChannelMessage`, {
    method: "POST",
    body: JSON.stringify({
      channelId,
      content,
    }),
  })
}
/**
 *
 * @param {Object} option - task Options:
 * {
 * "channelName": "string",
 * "createdBy": "string",
 * "description": "string",
 * "members": [
 *   {
 *     "email": "string",
 *     "fullName": "string",
 *     "userName": "string"
 *   }
 * ],
 * "taskId": "string"
 * }
 * @param {String} token
 */
export async function setupChannel(option) {
  return await fetchJSON(`${PRODUCT_APP_URL_API}/mp/api/setupChannel`, {
    medthod: "POST",
    body: JSON.stringify(option),
  })
}

/**
 * Get task's discussion channels
 * @param {String} taskId - Task Id
 * @param {String} token - User authorization token
 */
export async function discussionChannelsForTask(taskId) {
  return await fetchJSON(
    `${PRODUCT_APP_URL_API}/mp/api/tasks/discussionChannelsForTask`,
    {
      medthod: "GET",
      body: JSON.stringify({
        taskId,
      }),
    },
  )
}

export async function usersOfCurrentStep(taskId) {
  return await fetchJSON("/wf/api/v1/usersOfCurrentStep", {
    method: "GET",
    body: JSON.stringify({
      taskId,
    }),
  })
}

export async function usersOfNextStep(taskId) {
  return await fetchJSON(`/wf/api/v1/usersOfNextStep`, {
    body: JSON.stringify({
      taskId,
    }),
  })
}
export async function getInfosUser() {
  return await fetchJSON(`/wf/api/v1/info`)
}

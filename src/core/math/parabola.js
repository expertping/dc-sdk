/*
 * @Author: Caven
 * @Date: 2020-05-28 10:24:38
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-28 14:33:28
 */
import { Util } from '../utils'

export default function parabola(
  startPosition,
  endPosition,
  height = 0,
  count = 50
) {
  //方程 y=-(4h/L^2)*x^2+h h:顶点高度 L：横纵间距较大者
  let result = []
  if (!Util.checkPosition(startPosition) || !Util.checkPosition(endPosition)) {
    return result
  }
  height = Math.min(+height, 5000)
  count = Math.min(+count, 50)
  let diffLng = Math.abs(startPosition.lng - endPosition.lng)
  let diffLat = Math.abs(startPosition.lat - endPosition.lat)
  let L = Math.max(diffLng, diffLat)
  let dlt = L / count
  if (diffLng > diffLat) {
    //以lng为基准
    let delLat = (endPosition.lat - startPosition.lat) / count
    if (startPosition.lng - endPosition.lng > 0) {
      dlt = -dlt
    }
    for (let i = 0; i < count; i++) {
      let h =
        height -
        (Math.pow(-0.5 * L + Math.abs(dlt) * i, 2) * 4 * height) /
          Math.pow(L, 2)
      let lng = startPosition.lng + dlt * i
      let lat = startPosition.lat + delLat * i
      result.push([lng, lat, h])
    }
  } else {
    let delLng = (endPosition.lng - startPosition.lng) / count
    if (startPosition.lat - endPosition.lat > 0) {
      dlt = -dlt
    }
    for (let i = 0; i < count; i++) {
      let h =
        height -
        (Math.pow(-0.5 * L + Math.abs(dlt) * i, 2) * 4 * height) /
          Math.pow(L, 2)
      let lng = startPosition.lng + delLng * i
      let lat = startPosition.lat + dlt * i
      result.push([lng, lat, h])
    }
  }

  return result
}

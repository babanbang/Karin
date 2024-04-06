import Api from './api.js'
import { logger, Bot } from '#Karin'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'

export default class Kritor {
  /**
   * 获取 proto 文件
   * @param {string} filename
   * @param {string[]} dirs
   * @returns {unknown}
   */
  getProtoGrpcType (filename) {
    filename = process.cwd() + '/lib/adapter/kritor/kritor/protos/' + filename
    const dirs = [process.cwd() + '/lib/adapter/kritor/kritor/protos']
    const definition = protoLoader.loadSync(filename, {
      includeDirs: dirs,
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    })
    return grpc.loadPackageDefinition(definition)
  }

  /** 初始化 gRPC 服务器 */
  init () {
    const authenticationProtoGrpcType = this.getProtoGrpcType('auth/authentication.proto')
    const coreProtoGrpcType = this.getProtoGrpcType('core/core.proto')
    const customizationGrpcType = this.getProtoGrpcType('customization/customization.proto')
    const developerGrpcType = this.getProtoGrpcType('developer/developer.proto')
    const QsignGrpcType = this.getProtoGrpcType('developer/qsign.proto')
    const eventProtoGrpcType = this.getProtoGrpcType('event/event.proto')
    const GroupFileGrpcType = this.getProtoGrpcType('file/group_file.proto')
    const friendGrpcType = this.getProtoGrpcType('friend/friend.proto')
    const groupGrpcType = this.getProtoGrpcType('group/group.proto')
    const guildGrpcType = this.getProtoGrpcType('guild/guild.proto')
    const messageProtoGrpcType = this.getProtoGrpcType('message/message.proto')
    const reverseProtoGrpcType = this.getProtoGrpcType('reverse/reverse.proto')
    const webGrpcType = this.getProtoGrpcType('web/web.proto')

    const authenticationServer = {
      RegisterPassiveListener: (call) => {
        /** 监听上报事件 */
        call.on('data', data => {
          logger.info('上报事件：', data)
          Bot.emit(data.type, data)
        })
      },
      ReverseStream: (call) => {
        logger.info('收到反向流请求：', call.metadata.getMap())
        const bot = new Api(call)
        bot.GetCurrentAccount()
          .then(res => {
            const { accountUid: uid, accountUin: uin, accountName: name } = res
            bot.account = { uid, uin, name }
            /** 注册bot */
            Bot.emit('bot', bot)
          })
          .catch(error => logger.error(error))
      }
    }

    const server = new grpc.Server()
    server.addService(coreProtoGrpcType.kritor.core.CoreService.service, authenticationServer)
    server.addService(authenticationProtoGrpcType.kritor.authentication.AuthenticationService.service, authenticationServer)
    server.addService(eventProtoGrpcType.kritor.event.EventService.service, authenticationServer)
    server.addService(reverseProtoGrpcType.kritor.reverse.ReverseService.service, authenticationServer)
    server.addService(messageProtoGrpcType.kritor.message.MessageService.service, authenticationServer)
    server.addService(friendGrpcType.kritor.friend.FriendService.service, authenticationServer)
    server.addService(groupGrpcType.kritor.group.GroupService.service, authenticationServer)
    server.addService(guildGrpcType.kritor.guild.GuildService.service, authenticationServer)
    server.addService(GroupFileGrpcType.kritor.file.GroupFileService.service, authenticationServer)
    server.addService(customizationGrpcType.kritor.customization.CustomizationService.service, authenticationServer)
    server.addService(developerGrpcType.kritor.developer.DeveloperService.service, authenticationServer)
    server.addService(QsignGrpcType.kritor.developer.QsignService.service, authenticationServer)
    server.addService(webGrpcType.kritor.web.WebService.service, authenticationServer)

    server.bindAsync('0.0.0.0:7001', grpc.ServerCredentials.createInsecure(), (err, port) => {
      if (err) {
        logger.error('grpc服务器启动失败：', err)
      } else {
        logger.log('grpc服务启动成功，监听端口：', port)
      }
    })
    /** 监听程序退出事件 关闭服务器 */
    process.on('exit', () => server.forceShutdown())
  }
}
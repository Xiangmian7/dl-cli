import ora from "ora"
import chalk from "chalk"
import path from "path"
import fs from "fs-extra"
import Inquirer from "inquirer"
import download from "download-git-repo"

export default async function create(projectName, options) {
  // 获取当前工作目录
  const cwd = process.cwd()
  // 拼接得到项目目录
  const targetDirectory = path.join(cwd, projectName)
  // 判断目录是否存在
  if (fs.existsSync(targetDirectory)) {
    // 判断是否使用 --force 参数
    if (options.force) {
      // 删除重名目录(remove是个异步方法)
      await fs.remove(targetDirectory)
    } else {
      let { isOverwrite } = await new Inquirer.prompt([
        // 返回值为promise
        {
          name: "isOverwrite", // 与返回值对应
          type: "list", // list 类型
          message: "Target directory exists, Please choose an action",
          choices: [
            { name: "Overwrite", value: true },
            { name: "Cancel", value: false },
          ],
        },
      ])
      // 选择 Cancel
      if (!isOverwrite) {
        console.log("Cancel")
        return
      } else {
        console.log(`Removing ${projectName}, please wait a moment...`)
        await fs.remove(targetDirectory)
      }
    }
  }
  const spinner = ora("正在创建项目...").start()
  download(`https://github.com:Xiangmian7/next-starter#main`, targetDirectory, { clone: true }, async err => {
    spinner.stop()
    if (err) {
      console.log(`创建项目失败：${projectName}`)
      console.log("失败原因：", err)
    } else {
      console.log(`成功创建项目：${projectName}`)
      console.log(chalk.green("初始化项目成功!"))
    }
  })
}

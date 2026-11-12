# Nyxion Heredity Plugin Registry

> 🧬 这是 Nyxion 生态中 `Nyxion-Heredity` 宿主程序的官方与社区插件索引库 (Plugin Registry)。
> 本仓库**绝不托管**任何具体的插件源代码，仅作为元数据 (Metadata) 索引目录。`Nyxion-Heredity` 客户端会拉取本仓库的 `plugins.json` 文件，以渲染客户端的“插件市场”。

## ⚠️ 法律免责与安全声明 (Disclaimer)

**在使用或开发插件前，请务必仔细阅读以下声明：**

1. **协议中立性**：本仓库仅提供基于标准化协议（如 OneBot 11）的通讯适配框架索引。**Nyxion 官方不包含、不审查、且不提供**任何针对特定第三方通讯平台（IM）的私有协议逆向或破解实现。
2. **第三方风险自担**：所有收录的插件均由第三方开发者提供。因使用第三方插件导致的任何外部账号封禁、数据丢失、服务中断或法律纠纷，**Nyxion 官方及本仓库维护者不承担任何连带责任**。
3. **权限与沙箱**：宿主程序 (`Nyxion-Heredity`) 将根据插件声明的 `permissions` 实施物理级沙箱隔离。请用户在安装涉及高权限（如 `fs.write`, `net.connect`）的插件前，自行评估源码安全性。

---

## 🛡️ 插件安全与封禁机制 (Security & Status)

为了维护生态安全，`plugins.json` 中的每个插件都包含 `status` 字段。客户端会根据此字段进行严格的准入拦截：

*   `active`：正常状态，允许下载与安装。
*   `warning`：风险状态，客户端会弹出警告，需用户手动确认方可继续。
*   `banned`：封禁状态，**客户端将直接拒绝下载与加载**。

如果某个插件被发现包含恶意代码、窃取隐私或严重违规，官方将把其状态修改为 `banned`，并在 `security_advisory` 字段中记录封禁原因。

---

## 🚀 开发者提交指南 (How to Submit)

欢迎提交你的插件！本仓库接入了 GitHub Actions 自动化流水线，只要格式合规，即可快速上架。

1. **开发与发布**：在你的 GitHub 仓库中完成插件开发，并发布 `Releases` 包（支持 `.wasm` 或 `.zip`）。
2. **计算哈希**：计算你发布包的 `SHA256` 哈希值（必须是 64 位字符）。
3. **Fork 本仓库**。
4. **修改 `plugins.json`**：在文件末尾的 `plugins` 数组中添加你的插件元数据。
   *   *注意：你**可以不**手动填写 `id` 字段，GitHub Actions 会根据你的作者名和仓库名自动为你生成唯一 ID 并排序。*
5. **发起 Pull Request**：提交 PR。云端会自动运行校验脚本，若格式无误且校验通过，管理员将进行合并。

### 📄 字段规范说明 (Schema)

提交的 JSON 节点必须包含以下字段：

| 字段 | 类型 | 必填 | 说明 |
| :--- | :--- | :--- | :--- |
| `name` | String | 是 | 插件显示名称。 |
| `description` | String | 是 | 插件的简短介绍。 |
| `version` | String | 是 | 语义化版本号（如 `1.0.0`）。 |
| `license` | String | 是 | 开源协议（如 `MIT`）。 |
| `author` | Object | 是 | 包含 `name` 和 `github` 链接。 |
| `min_heredity_version`| String | 是 | 最低兼容的宿主版本。 |
| `permissions` | Array | 是 | 插件申请的权限列表（如 `["net.connect"]`），若无请填 `[]`。 |
| `download_url` | String | 是 | 插件 Release 包的直接下载链接。 |
| `hash_sha256` | String | 是 | 下载包的 64 位哈希值，用于防篡改校验。 |
| `status` | String | 是 | 初始提交统一填 `"active"`。 |

---

## 🔗 宿主接入方式

`Nyxion-Heredity` 客户端默认从此 Raw 链接拉取最新插件列表：

`https://raw.githubusercontent.com/NyXion-EcoWarehouse/Nyxion-Heredity-Registry/main/plugins.json`

---

<div align="center">
</div>

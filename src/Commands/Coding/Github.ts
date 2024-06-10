import axios from 'axios'
import { Command, Message, BaseCommand } from '../../Structures'

// Define interfaces for GitHub API responses
interface UserInfo {
    login: string
    avatar_url: string
    html_url: string
    name: string
    repos_url: string
    location: string | null
    email: string | null
    bio: string | null
    twitter_username: string | null
    public_repos: number
    public_gists: number
    followers: number
    following: number
    created_at: string
    updated_at: string
    hireable: boolean
    blog: string | null
    company: string | null
    gravatar_id: string | null
}

interface RepoInfo {
    name: string
    full_name: string
    owner: UserInfo
    description: string | null
    language: string
    stargazers_count: number
    watchers_count: number
    forks_count: number
    open_issues_count: number
    license: {
        name: string
    }
    created_at: string
    updated_at: string
    html_url: string // Add html_url property
}

@Command('github', {
    aliases: ['gh'],
    description: 'Get GitHub information about a user/repo',
    category: 'coding',
    usage: 'github [username/repo | username]'
})
export default class GitHubCommand extends BaseCommand {
    public override execute = async (message: Message, { joined }: any): Promise<void> => {
        const terms = joined.trim().split('/')
        if (terms[0] === '') {
            return void message.reply(`Arguments not found. Use ${this.client.config.prefix}gh (username/repo | username)`)
        }
        
        const username = terms[0]
        const repo = terms.length > 1 ? terms[1] : null
        let text = ''
        
        if (!repo) {
            const userInfo = await axios
                .get<UserInfo>(`https://api.github.com/users/${username}`)
                .then((res) => res.data)
                .catch((err) => {
                    console.log(err)
                    return void message.reply('🟥 ERROR 🟥\n Failed to fetch the User')
                })

            if (!userInfo) {
                return void message.reply('🟥 ERROR 🟥\n Failed to fetch the User')
            }

            // Prepare text information for user profile
            text += `🌐 *URL:* ${userInfo.html_url}\n`
            text += `🌟 *Username:* ${userInfo.name}\n`
            if (userInfo.email !== null) text += `📧 *Email:* ${userInfo.email}\n`
            if (userInfo.location !== null) text += `📍 *Location:* ${userInfo.location}\n`
            if (userInfo.bio !== null) text += `🚀 *Bio:* ${userInfo.bio}\n`
            text += `*👥 Followers:* ${userInfo.followers}\n💫 *Following:* ${userInfo.following}\n`
            text += `💮 *Public Repositories:* ${userInfo.public_repos}\n`
            return void message.reply(text)
        } else {
            const repoInfo = await axios
                .get<RepoInfo>(`https://api.github.com/repos/${username}/${repo}`)
                .then((res) => res.data)
                .catch((err) => {
                    console.log(err)
                    return void message.reply('🟥 ERROR 🟥\n Failed to fetch the Repo')
                })

            if (!repoInfo) {
                return void message.reply('🟥 ERROR 🟥\n Failed to fetch the Repo')
            }

            // Prepare text information for repository
            text += `🌐 *URL :* ${repoInfo.html_url}\n`
            text += `📂 *Repository Name :* ${repoInfo.name}\n`
            text += `❄ *Description:* ${repoInfo.description ?? '-'}\n`
            text += `🎀 *License:* ${repoInfo.license.name}\n`
            text += `🌟 *Stars:* ${repoInfo.stargazers_count}\n`
            text += `🌸 *Language:* ${repoInfo.language}\n`
            text += `🍴 *Forks:* ${repoInfo.forks_count}\n`
            text += `⚠️ *Issues:* ${repoInfo.open_issues_count}\n`
            text += `📅 *Created on:* ${repoInfo.created_at}\n`
            text += `📅 *Updated on:* ${repoInfo.updated_at.slice(0, 11)}\n`

            return void message.reply(text)
        }
    }
                }

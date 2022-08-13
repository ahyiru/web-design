/* 

feat: feature 新功能，新需求
fix: 修复 bug
docs: 仅仅修改了文档，比如README, CHANGELOG, CONTRIBUTE等等
style: 仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑
perf: 性能优化
refactor: 代码重构，没有加新功能或者修复bug
test: 测试用例，包括单元测试、集成测试等
chore: 改变构建流程、或者增加依赖库、工具等，包括打包和发布版本
build: 影响构建系统或外部依赖项的更改（gulp，npm等）
ci: 对CI配置文件和脚本的更改
revert: 回滚到上一个版本
conflict: 解决合并过程中

 */

module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      issuePrefixes: ['#'],
    },
  },
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'perf', 'refactor', 'test', 'chore', 'build', 'ci', 'revert', 'conflict']],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'scope-case': [0],
    'scope-empty': [0],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
  },
  prompt: {
    messages: {
      skip: ':跳过',
      max: '最多 %d 字符',
      min: '至少 %d 字符',
      emptyWarning: '不能为空',
      upperLimitWarning: '超出限制',
      lowerLimitWarning: '低于限制',
    },
    questions: {
      type: {
        description: `选择您要提交的更改类型: `,
        enum: {
          feat: {
            description: '新功能',
            title: 'Features',
            emoji: '✨',
          },
          fix: {
            description: 'Bug 修复',
            title: 'Bug Fixes',
            emoji: '🐛',
          },
          docs: {
            description: '文档',
            title: 'Documentation',
            emoji: '📚',
          },
          style: {
            description: '风格样式',
            title: 'Styles',
            emoji: '💎',
          },
          refactor: {
            description: '代码重构',
            title: 'Code Refactoring',
            emoji: '📦',
          },
          perf: {
            description: '性能优化',
            title: 'Performance Improvements',
            emoji: '🚀',
          },
          test: {
            description: '测试',
            title: 'Tests',
            emoji: '🚨',
          },
          build: {
            description: '打包构建',
            title: 'Builds',
            emoji: '🛠',
          },
          ci: {
            description: 'CI 配置',
            title: 'Continuous Integrations',
            emoji: '⚙️',
          },
          chore: {
            description: `构建/工程依赖/工具`,
            title: 'Chores',
            emoji: '♻️',
          },
          revert: {
            description: '回退',
            title: 'Reverts',
            emoji: '🗑',
          },
        },
      },
      scope: {
        description: 'What is the scope of this change (e.g. component or file name)',
      },
      subject: {
        description: 'Write a short, imperative tense description of the change',
      },
      body: {
        description: 'Provide a longer description of the change',
      },
      isBreaking: {
        description: 'Are there any breaking changes?',
      },
      breakingBody: {
        description: 'A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself',
      },
      breaking: {
        description: 'Describe the breaking changes',
      },
      isIssueAffected: {
        description: 'Does this change affect any open issues?',
      },
      issuesBody: {
        description: 'If issues are closed, the commit requires a body. Please enter a longer description of the commit itself',
      },
      issues: {
        description: 'Add issue references (e.g. "fix #123", "re #123".)',
      },
    },
  },
};

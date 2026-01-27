/**
 * 问卷数据结构和配置
 * 9 个核心问题 - 扁平化结构
 */

// ==================== 类型定义 ====================

export interface Question {
  id: number; // 问题编号 1-9
  title: string; // 问题标题（如：荣耀时刻）
  subtitle: string; // 英文副标题（如：The Highlight）
  content: string; // 完整问题内容
  hint: string; // 提示文字/详细描述
  required: boolean; // 是否必填
  purpose: string; // AI 分析目的（后期用于 AI 分析，前端不显示）
  icon: string; // lucide 图标名
}

// ==================== 问卷数据 ====================

export const QUESTIONNAIRE_DATA: Question[] = [
  {
    id: 1,
    title: "荣耀时刻",
    subtitle: "The Highlight",
    content: "回顾过去几年，哪一两个时刻让你发自内心地想说「我真棒」？",
    hint: "请描述当时具体的场景：你克服了什么困难？做成了什么事？哪怕只是帮朋友搞定了一个大麻烦，或者是学会了一项新技能这种「小确幸」都可以。重点是那种由内而外的成就感。",
    required: true,
    purpose:
      "寻找「高光时刻」，通过用户的成就事件，分析其驱动力来源（是攻克难关、是帮助他人、还是创新）",
    icon: "Trophy",
  },
  {
    id: 2,
    title: "忘我之境",
    subtitle: "The Flow",
    content:
      "做什么事情的时候，你会感觉时间过得特别快，甚至忘记了吃饭和睡觉？",
    hint: "这可能是在工作中，也可能是在业余爱好里。请回忆那种完全沉浸、不觉得累、甚至希望能一直做下去的状态。",
    required: true,
    purpose:
      "捕捉「心流体验」，心流（Flow）是天赋的最强信号，表明技能与挑战高度匹配，且用户乐在其中",
    icon: "Flame",
  },
  {
    id: 3,
    title: "你的「功能」",
    subtitle: "User Manual",
    content:
      "身边的朋友或同事，最常找你帮什么忙？或者遇到什么问题时，他们第一个想到的就是你？",
    hint: "例如：你是众人的「情绪垃圾桶」、「点子王」、「排版救星」还是「靠谱的执行者」？即使你觉得这些忙只是举手之劳，也请写下来。",
    required: true,
    purpose:
      "定位「功能性价值」，这反映了用户在社会网络中的「工具属性」或「标签」，是未来变现的雏形",
    icon: "Users",
  },
  {
    id: 4,
    title: "他人镜像",
    subtitle: "Social Mirror",
    content:
      "如果让最熟悉你的三个人分别用一个词来形容你的特长，你觉得会是什么？",
    hint: "请不要只写形容词（如善良、聪明），试着补充一个具体的理由。例如：「敏锐——因为我总能发现别人没注意到的细节」。",
    required: true,
    purpose:
      "提取「关键词标签」，用于AI构建用户画像的关键词云，判断用户给他人的核心印象",
    icon: "UserSearch",
  },
  {
    id: 5,
    title: "天生优势",
    subtitle: "Natural Gift",
    content:
      "有什么事是你做起来觉得「这很简单啊」，但周围人却觉得很难、甚至很痛苦的？",
    hint: "这就是你的「降维打击」领域。也许是快速理清逻辑、也许是安抚愤怒的客户、或者是对数字的敏感度。请寻找那些你觉得「理所当然」但别人却「如临大敌」的事。",
    required: true,
    purpose:
      "识别「知识的诅咒」，当你觉得简单而别人觉得难，说明这正是你的天赋所在（护城河）",
    icon: "Zap",
  },
  {
    id: 6,
    title: "精神食粮",
    subtitle: "Nourishment",
    content:
      "翻翻你的账单和浏览记录，你最舍得把钱和时间花在什么领域的学习或体验上？",
    hint: "你的钱和时间流向哪里，你的潜意识就在哪里。是买了各种课程、装备，还是把时间花在了研究某种特定的知识、美学或技能上？",
    required: true,
    purpose:
      "洞察「真实渴望」，真金白银的投入骗不了人，反映了深层的价值观和兴趣导向",
    icon: "Heart",
  },
  {
    id: 7,
    title: "终极渴望",
    subtitle: "Inner Calling",
    content:
      "如果明天醒来，你已经拥有了足够的财富，不再需要为了生存而工作，你最想把一天的时间花在什么事上？",
    hint: "这代表了你灵魂深处的渴望。是去创作、去教书、去探索世界，还是去解决某个具体的社会问题？请抛开现实束缚，大胆想象。",
    required: true,
    purpose:
      "剥离「生存压力」，去除了工作和生存压力后的纯粹选择，最接近人的本性（天性）",
    icon: "Sparkles",
  },
  {
    id: 8,
    title: "能量黑洞",
    subtitle: "The Shadow",
    content:
      "哪怕你很努力去做，依然觉得很累、很痛苦，感觉身体被掏空，且结果往往不如别人的事情是什么？",
    hint: "这是你的「非天赋区」。识别它们是为了避坑。是机械重复的琐事、复杂的勾心斗角，还是需要高度细致的数字核对？",
    required: true,
    purpose:
      "排除「伪天赋」，即使有些事你会做，但如果它消耗能量，那就不是天赋，而是为了生存习得的技能",
    icon: "Ban",
  },
  {
    id: 9,
    title: "定位校准",
    subtitle: "The Coordinates",
    content:
      "最后，为了让这份报告能直接落地到你的现实生活，请告诉我们你当下的坐标",
    hint: "1. 探索意图：你这次做挖掘最想解决的一个困惑是什么？是职业转型、寻找副业、自我成长还是创业？\n2. 已知线索：你之前做过其他测评吗？如MBTI、盖洛普、人类图等，如果有，请告诉结果，AI会结合它们进行交叉验证。",
    required: true,
    purpose:
      "综合获取用户背景、发展方向和已有测评结果，为AI提供完整的上下文信息，确保报告的针对性和落地性",
    icon: "MapPin",
  },
];

// ==================== 辅助函数 ====================

/** 获取所有问题总数 */
export function getTotalQuestions(): number {
  return QUESTIONNAIRE_DATA.length;
}

/** 获取必填问题总数 */
export function getRequiredQuestions(): number {
  return QUESTIONNAIRE_DATA.filter((q) => q.required).length;
}

/** 根据问题 ID 获取问题 */
export function getQuestionById(id: number): Question | undefined {
  return QUESTIONNAIRE_DATA.find((q) => q.id === id);
}

// 人类图 数据结构

/**
 * 人类图类型枚举
 */
enum HumanType {
  Generator = '生成者', // 发起者。具有持久能量和内在动力，适合做出回应并为他人提供能量。
  Manifestor = '显示者', // 主动行动、启动事情的力量，通常独立自主。
  Projector = '投射者', // 提供建议，但需要等待被邀请。
  Reflector = '反映者', // 镜像他人和环境的能量，反应性较强。
}

/**
 * 人类图策略枚举
 */
enum HumanStrategy {
  WaitForResponse = '等待回应', // 发起者策略
  WaitForInvitation = '等待邀请', // 投射者策略
  WaitForLunarCycle = '等待月亮周期', // 反应者策略
  InformOthers = '告知他人', // 发起人策略
}

/**
 * 人类图权威枚举
 */
enum HumanAuthority {
  Emotional = '情感权威', // 情感权威
  Intuitive = '直觉权威', // 直觉权威
  Instinctive = '本能权威', // 本能权威
  Rational = '理智权威', // 理智权威
}

// 定义人类图角色类型的基本数据结构
type HumanDesignRole = {
  gate: number; // 闸门的数字（例如 4, 6 等）
  line: number; // 爻的数字（1-6）
  lifeCycleStage: 'youth' | 'midLife' | 'elder'; // 人生的阶段：年轻期、中年期、老年期
};

/**
 * 人类图中心枚举
 */
enum HumanCenter {
  Head = 'head', // 头部中心
  Ajna = 'ajna', // 阿基那中心（思维中心）
  Throat = 'throat', // 喉咙中心
  G = 'g', // G中心（自我中心）
  Heart = 'heart', // 心脏中心（意志力中心）
  SolarPlexus = 'solar_plexus', // 太阳神经丛中心（情感中心）
  Sacral = 'sacral', // 骶骨中心（生命力中心）
  Root = 'root', // 根部中心
  Emotional = 'emotional', // 情绪中心
}

type HumanChart = {
  info: {
    // 类型
    type: HumanType;
    // 人生角色
    role: HumanDesignRole;
    // 定义
    definition: string;
    // 策略
    strategy: HumanStrategy;
    // 权威
    authority: HumanAuthority;
  };
  energy_centers: {
    [key in HumanCenter]: boolean;
  };
  channels: {
    channel: [
      {
        center: HumanCenter;
        gate: string;
      },
      {
        center: HumanCenter;
        gate: string;
      }
    ];
  }[];
  gates: [
    {
      gate: string;
      center: HumanCenter;
    },
    {
      gate: string;
      center: HumanCenter;
    }
  ];
  life_stages: {
    stage_2: {
      description: string;
      challenges: string[];
    };
    stage_4: {
      description: string;
      challenges: string[];
    };
  };
  overall_summary: {
    summary: string;
    advice: string[];
  };
};

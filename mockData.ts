
import { Discipline, Achievement, User, Recommendation, ExerciseType, Teacher, Message, Flashcard } from './types';

export const TEACHERS: Teacher[] = [
  {
    id: 't1',
    name: 'Prof. Amélia Zola',
    specialty: 'Matemática & Física',
    bio: 'Apaixonada por ensinar exatas de forma simples. Mestre em Engenharia Civil.',
    avatarUrl: 'https://i.pravatar.cc/150?u=t1'
  },
  {
    id: 't2',
    name: 'Dr. João Mavungo',
    specialty: 'Biologia & Química',
    bio: 'Doutorado em Bioquímica. Preparo alunos para Medicina há 10 anos.',
    avatarUrl: 'https://i.pravatar.cc/150?u=t2'
  }
];

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Carlos Silva',
  email: 'carlos@kanda.ao',
  role: 'student',
  targetCourse: 'Engenharia Informática',
  academicLevel: 4,
  streakDays: 4,
  totalXP: 1250,
  teacherId: 't1',
  status: 'active'
};

// Extra mock students for Admin Table
export const MOCK_STUDENTS_LIST: User[] = [
  MOCK_USER,
  { id: 'u2', name: 'Ana Costa', email: 'ana@kanda.ao', role: 'student', targetCourse: 'Medicina', academicLevel: 2, streakDays: 0, totalXP: 450, teacherId: 't2', status: 'active' },
  { id: 'u3', name: 'Pedro Miguel', email: 'pedro@kanda.ao', role: 'student', targetCourse: 'Direito', academicLevel: 1, streakDays: 12, totalXP: 2100, status: 'active' },
  { id: 'u4', name: 'Sofia Lemos', email: 'sofia@kanda.ao', role: 'student', targetCourse: 'Arquitetura', academicLevel: 3, streakDays: 1, totalXP: 890, status: 'inactive' },
];

export const MOCK_TEACHER_ACCOUNT: User = {
  id: 't1',
  name: 'Prof. Amélia Zola',
  email: 'amelia@kanda.ao',
  role: 'teacher',
  specialty: 'Matemática & Física',
  bio: 'Apaixonada por ensinar exatas de forma simples. Mestre em Engenharia Civil pela UAN. Leciono há 15 anos com foco em preparação para exames nacionais.',
  status: 'active'
};

export const MESSAGES: Message[] = [
  {
    id: 'm1',
    senderId: 't1',
    receiverId: 'u1',
    content: 'Olá Carlos! Vi que tiveste um ótimo desempenho em Álgebra. Continua assim!',
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
    isRead: true
  },
  {
    id: 'm2',
    senderId: 'u1',
    receiverId: 't1',
    content: 'Obrigado Professora. Tenho uma dúvida na questão 3 do módulo de Matrizes.',
    timestamp: new Date(Date.now() - 4000000), // few hours ago
    isRead: true
  },
  {
    id: 'm3',
    senderId: 't1',
    receiverId: 'u1',
    content: 'Claro, podes enviar a foto do teu cálculo? Vou analisar.',
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    isRead: false
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'a1', title: 'Primeiros Passos', description: 'Completaste a tua primeira aula.', icon: '🚀', unlocked: true },
  { id: 'a2', title: 'Disciplinado', description: 'Estudaste 3 dias seguidos.', icon: '📅', unlocked: true },
  { id: 'a3', title: 'Mestre da Matéria', description: '100% em um simulado.', icon: '🏆', unlocked: false },
  { id: 'a4', title: 'Maratona', description: '10 aulas concluídas.', icon: '📚', unlocked: false },
];

export const RECOMMENDATIONS: Recommendation[] = [
  { id: 'r1', type: 'content', title: 'Revisar Logaritmos', reason: 'Desempenho baixo no último teste', targetId: 't2' },
  { id: 'r2', type: 'exercise', title: 'Simulado de Física', reason: 'Hora de testar a Cinemática', targetId: 'sim1' },
];

export const FLASHCARDS: Flashcard[] = [
  {
    id: 'f1',
    disciplineId: 'math',
    front: 'O que é o Determinante de uma matriz?',
    back: 'É um número associado a uma matriz quadrada que resume certas propriedades algébricas, útil para resolver sistemas lineares.',
    nextReviewDate: new Date(), // Due now
    interval: 0,
    easeFactor: 2.5,
    repetitions: 0
  },
  {
    id: 'f2',
    disciplineId: 'math',
    front: 'Fórmula da Equação Quadrática (Bhaskara)',
    back: 'x = (-b ± √(b² - 4ac)) / 2a',
    nextReviewDate: new Date(), // Due now
    interval: 0,
    easeFactor: 2.5,
    repetitions: 0
  },
  {
    id: 'f3',
    disciplineId: 'phy',
    front: 'Primeira Lei de Newton',
    back: 'Lei da Inércia: Um corpo tende a permanecer em repouso ou em movimento retilíneo uniforme, a menos que uma força atue sobre ele.',
    nextReviewDate: new Date(Date.now() + 86400000), // Tomorrow
    interval: 1,
    easeFactor: 2.5,
    repetitions: 1
  }
];

export const DISCIPLINES: Discipline[] = [
  {
    id: 'math',
    name: 'Matemática',
    description: 'Álgebra, Geometria, Cálculo e Estatística.',
    progress: 45,
    color: 'bg-blue-600',
    modules: [
      {
        id: 'm1',
        disciplineId: 'math',
        title: 'Álgebra Linear',
        description: 'Vetores, Matrizes e Sistemas Lineares',
        order: 1,
        topics: [
          {
            id: 't1',
            moduleId: 'm1',
            title: 'Introdução aos Vetores',
            order: 1,
            isCompleted: true,
            content: `
# Vetores
Vetores são segmentos de reta orientados que possuem módulo, direção e sentido.

### Propriedades
1. **Módulo**: O tamanho do vetor.
2. **Direção**: A reta suporte onde o vetor se encontra.
3. **Sentido**: A orientação (para onde a seta aponta).
            `,
            exercises: [
              {
                id: 'e1',
                topicId: 't1',
                statement: 'Qual das opções abaixo define um vetor?',
                type: ExerciseType.MULTIPLE_CHOICE,
                options: ['Apenas um número', 'Módulo, direção e sentido', 'Apenas direção', 'Uma matriz 2x2'],
                correctAnswer: 1,
                explanation: 'Um vetor é definido por essas três grandezas: magnitude (módulo), direção e sentido.'
              }
            ]
          },
          {
            id: 't2',
            moduleId: 'm1',
            title: 'Matrizes e Determinantes',
            order: 2,
            isCompleted: false,
            content: '# Determinantes',
             exercises: [
              {
                id: 'e2',
                topicId: 't2',
                statement: 'O determinante só pode ser calculado para:',
                type: ExerciseType.MULTIPLE_CHOICE,
                options: ['Matrizes Retangulares', 'Qualquer Matriz', 'Matrizes Quadradas', 'Vetores'],
                correctAnswer: 2,
                explanation: 'Apenas matrizes quadradas (número de linhas igual ao número de colunas) possuem determinante.'
              }
            ]
          }
        ]
      },
      // --- NEW DEMO MODULE ---
      {
        id: 'm_demo',
        disciplineId: 'math',
        title: 'Laboratório de Exercícios',
        description: 'Demonstração de todos os tipos de interação disponíveis.',
        order: 99,
        topics: [
            {
                id: 't_demo',
                moduleId: 'm_demo',
                title: 'Playground de Interatividade',
                order: 1,
                isCompleted: false,
                content: `
# Bem-vindo ao Laboratório
Aqui podes testar todos os tipos de exercícios suportados pela plataforma Kanda.

Experimenta abaixo:
1. Correspondência (Matching)
2. Ordenação (Sequencing)
3. Preenchimento (Fill-in)
4. Múltipla Escolha
                `,
                exercises: [
                    {
                        id: 'ex_match_demo',
                        topicId: 't_demo',
                        statement: 'Associe os países às suas respectivas capitais (Correspondência)',
                        type: ExerciseType.MATCHING,
                        pairs: [
                            { left: 'Angola', right: 'Luanda' },
                            { left: 'Portugal', right: 'Lisboa' },
                            { left: 'Brasil', right: 'Brasília' },
                            { left: 'Moçambique', right: 'Maputo' }
                        ],
                        explanation: 'Estas são as capitais oficiais dos países lusófonos listados.'
                    },
                    {
                        id: 'ex_order_demo',
                        topicId: 't_demo',
                        statement: 'Organize os planetas por ordem de proximidade ao Sol (Ordenação)',
                        type: ExerciseType.ORDERING,
                        sequenceItems: [
                            'Mercúrio',
                            'Vénus',
                            'Terra',
                            'Marte',
                            'Júpiter'
                        ],
                        explanation: 'A ordem correta é Mercúrio, Vénus, Terra, Marte, Júpiter.'
                    },
                    {
                        id: 'ex_fill_demo',
                        topicId: 't_demo',
                        statement: 'Complete: A raiz quadrada de 144 é ___ (Digite o número)',
                        type: ExerciseType.SHORT_ANSWER,
                        correctText: '12',
                        explanation: '12 x 12 = 144.'
                    },
                    {
                        id: 'ex_mc_demo',
                        topicId: 't_demo',
                        statement: 'Qual destes NÃO é um número primo?',
                        type: ExerciseType.MULTIPLE_CHOICE,
                        options: ['2', '3', '9', '11'],
                        correctAnswer: 2,
                        explanation: '9 é divisível por 3, logo não é primo.'
                    },
                    {
                        id: 'ex_tf_demo',
                        topicId: 't_demo',
                        statement: 'A água ferve a 90ºC ao nível do mar. (V/F)',
                        type: ExerciseType.TRUE_FALSE,
                        options: ['Verdadeiro', 'Falso'],
                        correctAnswer: 1,
                        explanation: 'Ao nível do mar, a água ferve a 100ºC.'
                    }
                ]
            }
        ]
      }
    ]
  },
  {
    id: 'phy',
    name: 'Física',
    description: 'Mecânica, Termodinâmica, Eletricidade.',
    progress: 20,
    color: 'bg-purple-600',
    modules: [
        {
        id: 'mp1',
        disciplineId: 'phy',
        title: 'Cinemática & Dinâmica',
        description: 'Estudo do movimento e forças.',
        order: 1,
        topics: []
        }
    ]
  },
  {
    id: 'chem',
    name: 'Química',
    description: 'Química Geral, Orgânica e Físico-Química.',
    progress: 10,
    color: 'bg-teal-600',
    modules: []
  },
    {
    id: 'bio',
    name: 'Biologia',
    description: 'Citologia, Genética e Ecologia.',
    progress: 0,
    color: 'bg-green-600',
    modules: []
  }
];

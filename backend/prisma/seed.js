import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding NOVA database...');

  const passwordHash = await bcrypt.hash('StrongPassword123', 10);

  // 1. Upsert Demo User
  const user = await prisma.user.upsert({
    where: { email: 'dhanu@example.com' },
    update: {},
    create: {
      name: 'Dhanu',
      email: 'dhanu@example.com',
      passwordHash,
      company: 'NOVA Labs',
      jobTitle: 'Senior Product Lead'
    }
  });

  // 2. Create Workspace
  let workspace = await prisma.workspace.findFirst({
    where: { ownerId: user.id }
  });

  if (!workspace) {
    workspace = await prisma.workspace.create({
      data: {
        name: "Dhanu's Workspace",
        ownerId: user.id,
        members: {
          create: {
            userId: user.id,
            role: 'OWNER'
          }
        }
      }
    });
  }

  // 3. Create Sample Projects
  const project1 = await prisma.project.create({
    data: {
      workspaceId: workspace.id,
      name: 'AI Copilot Engine v2.4',
      description: 'Upgrade natural language context parser and sprint summary generation.',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      dueDate: new Date(Date.now() + 864000000)
    }
  });

  const project2 = await prisma.project.create({
    data: {
      workspaceId: workspace.id,
      name: 'SOC-2 Compliance Security Audit',
      description: 'Enterprise data retention policies and encryption audit.',
      status: 'COMPLETED',
      priority: 'URGENT',
      dueDate: new Date()
    }
  });

  // 4. Create Sample Tasks
  await prisma.task.createMany({
    data: [
      {
        projectId: project1.id,
        assignedToId: user.id,
        title: 'Auto-summarize customer feedback from Intercom & Slack',
        description: 'Process incoming support feedback and classify feature requests.',
        status: 'DONE',
        priority: 'HIGH'
      },
      {
        projectId: project1.id,
        assignedToId: user.id,
        title: 'Generate Figma UI component specifications & API stubs',
        description: 'Create frontend type definitions and mock API response schema.',
        status: 'IN_PROGRESS',
        priority: 'URGENT'
      },
      {
        projectId: project1.id,
        assignedToId: user.id,
        title: 'Schedule release sync & assign reviewer based on git blame',
        description: 'Setup automated GitHub webhook trigger for PR reviews.',
        status: 'TODO',
        priority: 'MEDIUM'
      }
    ]
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

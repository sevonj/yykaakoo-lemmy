import type { Community, Person } from 'lemmy-js-client'

export function hostname(actor_id: string): string {
  return new URL(actor_id).hostname
}

export function communityIdentifier(community: Community): string {
  return `!${community.name}@${hostname(community.actor_id)}`
}

export function communityRequestIdentifier(community: Community): string {
  return `${community.name}@${hostname(community.actor_id)}`
}

export function personIdentifier(person: Person): string {
  return `@${person.name}@${hostname(person.actor_id)}`
}

export function personRequestIdentifier(person: Person): string {
  return `${person.name}@${hostname(person.actor_id)}`
}
